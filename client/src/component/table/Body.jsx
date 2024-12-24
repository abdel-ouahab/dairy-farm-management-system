import React from 'react';
import { Tbody, Tr, Td } from '@chakra-ui/table';
import { HStack, Text } from '@chakra-ui/react';


const TableBody = ({ getTableBodyProps, rows, prepareRow }) => {
    return (
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <Tr key={index} {...row.getRowProps()} bg="white" borderBottom="2px" borderColor="gray.100">
              {row.cells.map((cell, key) => (
                <Td key={key} {...cell.getCellProps()}>
                  <HStack gap="1"> 
                    <Text color='black'>
                    {cell.render('Cell')}
                    </Text>
                    </HStack>
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    );
};
export default TableBody;
