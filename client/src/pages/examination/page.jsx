import React, { useState } from 'react';
import {CustomTable, Loading} from '../../component/index';
import { useQuery } from '@tanstack/react-query';
import { Heading, Flex, Button, Box, Text, Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Add from './forms/Add';
import Update from './forms/Update';
import ExaminationApi from '../../api/examination-api';
import { showSuccessToast } from '../../utils/toastUtils';

function Examination() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const userID = localStorage.getItem('userID');

  const api = process.env.REACT_APP_API;

  const { data, isLoading, refetch } = useQuery(['exam'], async () => {
    const res = await (await fetch(`${api}/examinations?userID=${userID}`)).json();
    return res.data;
  });

  if (isLoading) {
    return <Loading/>
  }
  
  const onEdit = async (values) => {
    await ExaminationApi.updateExam(values);
    refetch();
    showSuccessToast('Updated');
  };

  const onDelete = async (id) => {
    await ExaminationApi.deleteExam(id);
    refetch();
  };

  const handleAddExam = async (values) => {
    const data = {
      ...values,
      userID
    };
    await ExaminationApi.addExam(data);
    setShowAddForm(false);
    refetch();
    showSuccessToast('Added');
  };

  const handleEditExam = (rowData) => {
    setSelectedRowData(rowData);
    setShowEditForm(true);
  };


  const columns = [
    { Header: 'Disease', accessor: 'disease' },
    { Header: 'ExaminationDay', accessor: 'examinationdate' },
  ];

  return (
    <Box p={{ md: '6' }}>
      <Heading as="h1" mb="10">
        <Flex justify="space-between">
          <Text color="#334E68">Examination page</Text>
          <Button
            colorScheme="purple"
            leftIcon={<AddIcon w={3} h={3} />}
            onClick={() => setShowAddForm(true)}
          >
            Add Examination
          </Button>
        </Flex>
      </Heading>
      <CustomTable data={data} columns={columns} onDelete={onDelete} handleEdit={handleEditExam} />
      {showAddForm && (
        <Modal isOpen={showAddForm}>
          <ModalOverlay />
          <ModalContent maxW="600px">
            <Add setShowAddForm={setShowAddForm} handleAddExam={handleAddExam} />
          </ModalContent>
        </Modal>
      )}
      {showEditForm && (
        <Modal isOpen={showEditForm}>
          <ModalOverlay />
          <ModalContent maxW="600px">
            <Update row={selectedRowData} showEditForm={showEditForm} onEdit={onEdit} />
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}

export default Examination;
