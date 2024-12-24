import React, { useState } from 'react';
import {CustomTable, Loading} from '../../component/index';
import { Heading, Flex, Button, Box, Text, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import MilkApi from '../../api/milk-api';
import { AddIcon } from '@chakra-ui/icons';
import Add from './forms/Add';
import Update from './forms/Update';
import { showSuccessToast } from '../../utils/toastUtils';

function Milk() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const userID = localStorage.getItem('userID');

  const api = process.env.REACT_APP_API;

  const { data, isLoading, refetch } = useQuery(['milk'], async () => {
    const res = await (await fetch(`${api}/milk?userID=${userID}`)).json();
    return res.data;
  });

  if (isLoading) {
    return <Loading/>
  }

  const onDelete = async (id) => {
    await MilkApi.deleteMilk(id);
    refetch();
  };

  const onEdit = async (values) => {
    await MilkApi.updateMilk(values);
    refetch();
    showSuccessToast('Updated')
  };

  const handleEditMilk = (rowData) => {
    setSelectedRowData(rowData);
    setShowEditForm(true);
  };

  const handleAddMilk = async (values) => {
    const data = {
      ...values,
      userID
    };
    await MilkApi.addMilk(data);
    setShowAddForm(false);
    refetch();
    showSuccessToast('Added')
  };

  const columns = [
    { Header: 'Date', accessor: 'date' },
    { Header: 'MilkQuantity(liter)', accessor: 'milkquantity' },
  ];

  return (
    <Box p={{ md: '6' }}>
      <Heading as="h1" mb="10">
        <Flex justify="space-between">
          <Text color="#334E68">Milk page</Text>
          <Button
            colorScheme="purple"
            leftIcon={<AddIcon w={3} h={3} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Milk
          </Button>
        </Flex>
      </Heading>
      <CustomTable data={data} columns={columns} onDelete={onDelete} handleEdit={handleEditMilk} />
      {showAddForm && (
        <Modal isOpen={showAddForm}>
          <ModalOverlay />
          <ModalContent maxW="600px">
            <Add setShowAddForm={setShowAddForm} handleAddCMilk={handleAddMilk} />
          </ModalContent>
        </Modal>
      )}
      {showEditForm && (
        <Modal isOpen={showEditForm}>
          <ModalOverlay />
          <ModalContent maxW="600px">
            <Update setShowEditForm={setShowEditForm} row={selectedRowData} onEdit={onEdit} />
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default Milk;
