import { ResponsiveContainer, PieChart, Pie, Tooltip } from 'recharts';

const srOnly = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
};

export default function SpendByCategoryChart({ data = [] }) {
  return (
    <figure aria-label="Spend by category chart">
      <div aria-hidden="true">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="category" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <table style={srOnly} aria-label="Spend by category data table">
        <caption>Spend by Category</caption>
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.category}>
              <td>{item.category}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

