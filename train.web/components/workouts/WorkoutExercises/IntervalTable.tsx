import { Table } from "react-bootstrap";

interface IProps {

}

const IntervalTable = (props: IProps) => (
  <Table size="sm">
    <thead>
      <tr>
        <th>Set</th>
        <th>Weight</th>
        <th>Exercise Duration</th>
        <th>Rest</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>10</td>
        <td>0:45</td>
        <td>0:15</td>
      </tr>
    </tbody>
  </Table>
);

export default IntervalTable;