import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';
import type { Student } from '../utils/types';

interface StudentListProps {
  students: Student[];
  onDelete: (id: string) => void;
  onEdit: (student: Student) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onDelete, onEdit }) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleOpenModal = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedId) {
      onDelete(selectedId);
      handleCloseModal();
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã sinh viên</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Tuổi</TableCell>
              <TableCell>Giới tính</TableCell>
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Nơi sinh</TableCell>
              <TableCell>Địa chỉ</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.fullName}</TableCell>
                <TableCell>{s.age}</TableCell>
                <TableCell>{s.gender ? 'Nam' : 'Nữ'}</TableCell>
                <TableCell>{s.dateOfBirth}</TableCell>
                <TableCell>{s.placeOfBirth}</TableCell>
                <TableCell>{s.address}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="contained" color="info">Xem</Button>
                    <Button variant="contained" color="warning" onClick={() => onEdit(s)}>Sửa</Button>
                    <Button variant="contained" color="error" onClick={() => handleOpenModal(s.id)}>Xóa</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa sinh viên này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Xóa</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StudentList;