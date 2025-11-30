import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../components/DataTable";
import Modal from "../components/Modal";
import { fetchPaginatedSubmissions } from "../services/formService";

export default function SubmissionsPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selected, setSelected] = useState(null); // For modal

  const { data, isLoading, error } = useQuery({
    queryKey: ["submissions", page, limit, sortBy, sortOrder],
    queryFn: () =>
      fetchPaginatedSubmissions({
        page,
        limit,
        sortBy,
        sortOrder,
      }),
    keepPreviousData: true,
  });

  const columns = [
    { key: "id", label: "ID" },
    {
      key: "createdAt",
      label: "Created At",
      onSort: () => setSortOrder(sortOrder === "asc" ? "desc" : "asc"),
      sortIcon: sortOrder === "asc" ? "▲" : "▼",
    },
    {
      key: "data",
      label: "Submission Data",
      render: (row) => (
        <button
          className="text-blue-600 underline text-sm"
          onClick={() => setSelected(row)}
        >
          View
        </button>
      ),
    },
  ];

  if (isLoading)
    return <div className="p-6 text-center">Loading submissions...</div>;

  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        Error loading submissions
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Form Submissions</h1>

      {/* Table */}
      <DataTable columns={columns} data={data.data || []} />

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {data.page} of {data.totalPages}
        </span>

        <button
          disabled={page >= data.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Page Size */}
      <div className="mt-4">
        <label className="mr-2 font-medium">Rows per page:</label>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="border p-1 rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Modal for selected submission */}
      <Modal open={!!selected} onClose={() => setSelected(null)}>
        <h2 className="text-lg font-bold mb-2">Submission Details</h2>
        <pre className="text-sm bg-gray-50 p-3 rounded">
          {JSON.stringify(selected?.data, null, 2)}
        </pre>
      </Modal>
    </div>
  );
}
