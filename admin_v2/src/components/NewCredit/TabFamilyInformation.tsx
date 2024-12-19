import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { toast } from 'sonner';

interface Person {
  id: number;
  name: string;
  note: string;
  phone: string;
  relation: string;
}

const TabRelatedPersons: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);

  // Yeni şəxs əlavə edir
  const handleAddPerson = () => {
    const allFieldsFilled = persons.every(
      (person) => person.name && person.phone && person.relation
    );

    if (!allFieldsFilled) {
      toast.warning('Zəhmət olmasa mövcud şəxsin məlumatlarını tam doldurun.');
      return;
    }

    setPersons((prev) => [
      ...prev,
      { id: prev.length, name: '', phone: '', relation: '', note: '' },
    ]);
  };

  // Mövcud şəxs məlumatlarını yeniləyir
  const handlePersonChange = (id: number, field: keyof Person, value: string) => {
    setPersons((prev) =>
      prev.map((person) => (person.id === id ? { ...person, [field]: value } : person))
    );
  };

  // Şəxsi silir
  const handleDeletePerson = (id: number) => {
    setPersons((prev) => prev.filter((person) => person.id !== id));
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Əlaqəli Şəxslər
      </Typography>

      {persons.map((person, index) => (
        <Card key={person.id} sx={{ mb: 4, p: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              {person.relation}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Əlaqə Növü (Qohumluğu)"
                  value={person.relation}
                  onChange={(e) => handlePersonChange(person.id, 'relation', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Adı"
                  value={person.name}
                  onChange={(e) => handlePersonChange(person.id, 'name', e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Telefon Nömrəsi"
                  value={person.phone}
                  onChange={(e) =>
                    handlePersonChange(person.id, 'phone', e.target.value.replace(/\D/g, ''))
                  }
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  multiline
                  label="Əlavə qeyd"
                  value={person.note}
                  onChange={(e) => handlePersonChange(person.id, 'note', e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box textAlign="right" sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDeletePerson(person.id)}
              >
                Sil
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}

      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleAddPerson}>
          Yeni şəxs
        </Button>
      </Box>
    </Box>
  );
};

export default TabRelatedPersons;
