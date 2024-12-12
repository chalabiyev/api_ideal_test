// import React, { useState } from 'react';
// import { Box, Button, Card, CardContent, Grid, TextField, Typography, Avatar } from '@mui/material';

// const TabFamilyInformation = () => {
//   const [spouse, setSpouse] = useState({
//     photo: 'https://via.placeholder.com/120',
//     fin: '',
//     serial: '',
//     status: '',
//     name: '',
//     surname: '',
//     fatherName: '',
//     motherName: '',
//     maritalStatus: '',
//     gender: '',
//     address: '',
//   });

//   const [children, setChildren] = useState([]);

//   // Input değişimi takibi
//   const handleSpouseChange = (field, value) => {
//     setSpouse((prev) => ({ ...prev, [field]: value }));
//   };

//   // Yeni Övlad Eklenmesi
//   const handleAddChild = () => {
//     setChildren((prev) => [
//       ...prev,
//       {
//         id: prev.length,
//         photo: 'https://via.placeholder.com/120',
//         name: '',
//         surname: '',
//         gender: '',
//         birthDate: '',
//         address: '',
//       },
//     ]);
//   };

//   // Övlad Bilgisi Değişimi
//   const handleChildChange = (id, field, value) => {
//     setChildren((prev) =>
//       prev.map((child) => (child.id === id ? { ...child, [field]: value } : child))
//     );
//   };

//   // Övlad Silme
//   const handleDeleteChild = (id) => {
//     setChildren((prev) => prev.filter((child) => child.id !== id));
//   };

//   return (
//     <Box sx={{ py: 4 }}>
//       {/* Başlık */}
//       <Typography variant="h5" gutterBottom>
//         Ailə Məlumatları
//       </Typography>

//       {/* Həyat Yoldaşı Məlumatları */}
//       <Card sx={{ mb: 4, p: 2 }}>
//         <CardContent>
//           <Typography variant="subtitle1" gutterBottom>
//             Həyat Yoldaşı
//           </Typography>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={4}>
//               <Avatar
//                 sx={{
//                   width: 120,
//                   height: 120,
//                   margin: '0 auto',
//                   backgroundColor: '#f0f0f0',
//                 }}
//                 src={spouse.photo}
//               >
//                 Foto
//               </Avatar>
//             </Grid>
//             <Grid item xs={12} sm={8}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="FIN"
//                     value={spouse.fin}
//                     onChange={(e) => handleSpouseChange('fin', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Serial Number"
//                     value={spouse.serial}
//                     onChange={(e) => handleSpouseChange('serial', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Vəsiqənin Statusu"
//                     value={spouse.status}
//                     onChange={(e) => handleSpouseChange('status', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Ad"
//                     value={spouse.name}
//                     onChange={(e) => handleSpouseChange('name', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Soyad"
//                     value={spouse.surname}
//                     onChange={(e) => handleSpouseChange('surname', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Ata Adı"
//                     value={spouse.fatherName}
//                     onChange={(e) => handleSpouseChange('fatherName', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Ana Adı"
//                     value={spouse.motherName}
//                     onChange={(e) => handleSpouseChange('motherName', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Ailə Vəziyyəti"
//                     value={spouse.maritalStatus}
//                     onChange={(e) => handleSpouseChange('maritalStatus', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Cinsi"
//                     value={spouse.gender}
//                     onChange={(e) => handleSpouseChange('gender', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     label="Qeydiyyatda Olduğu Ünvan"
//                     value={spouse.address}
//                     onChange={(e) => handleSpouseChange('address', e.target.value)}
//                     fullWidth
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>

//       {/* Övladlar */}
//       {children.map((child, index) => (
//         <Card key={child.id} sx={{ mb: 4, p: 2 }}>
//           <CardContent>
//             <Typography variant="subtitle1" gutterBottom>
//               Övlad {index + 1}
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <Avatar
//                   sx={{
//                     width: 120,
//                     height: 120,
//                     margin: '0 auto',
//                     backgroundColor: '#f0f0f0',
//                   }}
//                   src={child.photo}
//                 >
//                   Foto
//                 </Avatar>
//               </Grid>
//               <Grid item xs={12} sm={8}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Ad"
//                       value={child.name}
//                       onChange={(e) => handleChildChange(child.id, 'name', e.target.value)}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Soyad"
//                       value={child.surname}
//                       onChange={(e) => handleChildChange(child.id, 'surname', e.target.value)}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Cinsi"
//                       value={child.gender}
//                       onChange={(e) => handleChildChange(child.id, 'gender', e.target.value)}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <TextField
//                       label="Doğum Tarixi"
//                       value={child.birthDate}
//                       onChange={(e) => handleChildChange(child.id, 'birthDate', e.target.value)}
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Qeydiyyatda Olduğu Ünvan"
//                       value={child.address}
//                       onChange={(e) => handleChildChange(child.id, 'address', e.target.value)}
//                       fullWidth
//                     />
//                   </Grid>
//                 </Grid>
//                 <Box textAlign="right" sx={{ mt: 2 }}>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleDeleteChild(child.id)}
//                   >
//                     Sil
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       ))}

//       {/* Yeni Övlad Ekle Butonu */}
//       <Box textAlign="center" sx={{ mt: 4 }}>
//         <Button variant="contained" color="primary" onClick={handleAddChild}>
//           Yeni Övlad Əlavə Et
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default TabFamilyInformation;
