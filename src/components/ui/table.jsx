export function Table({ children, className = "" }) {
  return (
    <table
      className={`
        w-full
        border-collapse
        table-auto
        ${className}
      `}
    >
      {children}
    </table>
  );
}

export function Th({ children, className = "" }) {
  return (
    <th
      className={`
        px-4 py-3
        text-left text-sm font-semibold
        text-gray-700
        bg-gray-100
        whitespace-nowrap
        ${className}
      `}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = "" }) {
  return (
    <td
      className={`
        px-4 py-3
        text-sm text-gray-800
        whitespace-nowrap
        ${className}
      `}
    >
      {children}
    </td>
  );
}
