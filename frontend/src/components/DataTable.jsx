import React from "react";

export default function DataTable({ columns, data }) {
  return (
    <table className="w-full border border-gray-300 rounded-md">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="p-2 border-b text-left font-medium text-gray-700 cursor-pointer"
              onClick={col.onSort}
            >
              {col.label}
              {col.sortIcon && <span className="ml-1">{col.sortIcon}</span>}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td className="p-4 text-center text-gray-500" colSpan={columns.length}>
              No Submissions Found
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="p-2 border-b">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
