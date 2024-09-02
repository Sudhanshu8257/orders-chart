import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrderTable = ({ data, completed }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {!completed && <TableHead className="w-[100px]">Type</TableHead>}
          <TableHead>Quantity</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, i) => (
          <TableRow key={i}>
            {!completed && (
              <TableCell className="font-medium">{item?.orderType}</TableCell>
            )}
            <TableCell>{item?.quantity}</TableCell>
            <TableCell>{item?.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderTable;
