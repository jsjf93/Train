import { Table } from "react-bootstrap";

interface IProps {

}

const StrengthTable = (props: IProps) => (
  <Table size="sm">
    <thead>
      <tr>
        <th>Set</th>
        <th>Weight</th>
        <th>Reps</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>10</td>
        <td>5</td>
        <td>1:30</td>
      </tr>
    </tbody>
  </Table>
);

export default StrengthTable;