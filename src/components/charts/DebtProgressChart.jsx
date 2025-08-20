import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

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

export default function DebtProgressChart({ data = [] }) {
  return (
    <figure aria-label="Debt progress chart">
      <div aria-hidden="true">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="balance" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <table style={srOnly} aria-label="Debt progress data table">
        <caption>Debt Progress</caption>
        <thead>
          <tr>
            <th>Period</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.period}>
              <td>{item.period}</td>
              <td>{item.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

