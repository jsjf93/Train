import { Table } from "react-bootstrap";

interface IProps {

}

const DurationTable = (props: IProps) => (
  <Table size="sm">
    <thead>
      <tr>
        <th>Set</th>
        <th>Duration</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>45:00</td>
      </tr>
    </tbody>
  </Table>
);

export default DurationTable;