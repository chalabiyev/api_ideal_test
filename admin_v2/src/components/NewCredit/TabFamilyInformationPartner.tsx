import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Slider,
  Rating,
  styled,
  Tooltip,
} from '@mui/material';
import { toast } from 'sonner';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

export interface Person {
  id: number;
  name: string;
  note: string;
  phone: string;
  relation: string;
}

interface AdditionalIncome {
  id: number;
  source: string;
  amount: string;
}

export interface FamilyInfo {
  workExperience: string;
  familyMembers: string;
  familyIncome: string;
  isRenting: boolean;
  rentAmount: string;
  rentDuration: string;
  actualAddress: string;
  additionalIncomes: AdditionalIncome[];
  idQuality: number;
  generalNote: string;
  relatedPersons: Person[];
}

interface TabRelatedPersonsProps {
  familyInfo: FamilyInfo;
  setFamilyInfo: React.Dispatch<React.SetStateAction<FamilyInfo>>;
}

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons: {
  [index: string]: {
    icon: React.ReactElement;
    label: string;
  };
} = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon color="error" />,
    label: 'Çox pis',
  },
  2: {
    icon: <SentimentDissatisfiedIcon color="error" />,
    label: 'Pis',
  },
  3: {
    icon: <SentimentSatisfiedIcon color="warning" />,
    label: 'Orta',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon color="success" />,
    label: 'Yaxşı',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon color="success" />,
    label: 'Çox yaxşı',
  },
};

function IconContainer(props: { value: number }) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

const TabRelatedPersons: React.FC<TabRelatedPersonsProps> = ({ familyInfo, setFamilyInfo }) => {
  const handleAddPerson = () => {
    const allFieldsFilled = familyInfo.relatedPersons.every(
      (person) => person.name && person.phone && person.relation
    );

    if (!allFieldsFilled) {
      toast.warning('Zəhmət olmasa mövcud şəxsin məlumatlarını tam doldurun.');
      return;
    }

    setFamilyInfo((prev) => ({
      ...prev,
      relatedPersons: [
        ...prev.relatedPersons,
        { id: prev.relatedPersons.length, name: '', phone: '', relation: '', note: '' },
      ],
    }));
  };

  const handlePersonChange = (id: number, field: keyof Person, value: string) => {
    setFamilyInfo((prev) => ({
      ...prev,
      relatedPersons: prev.relatedPersons.map((person) =>
        person.id === id ? { ...person, [field]: value } : person
      ),
    }));
  };

  const handleDeletePerson = (id: number) => {
    setFamilyInfo((prev) => ({
      ...prev,
      relatedPersons: prev.relatedPersons.filter((person) => person.id !== id),
    }));
  };

  const handleAddIncome = () => {
    setFamilyInfo((prev) => ({
      ...prev,
      additionalIncomes: [
        ...prev.additionalIncomes,
        { id: prev.additionalIncomes.length, source: '', amount: '' },
      ],
    }));
  };

  const handleIncomeChange = (id: number, field: keyof AdditionalIncome, value: string) => {
    setFamilyInfo((prev) => ({
      ...prev,
      additionalIncomes: prev.additionalIncomes.map((income) =>
        income.id === id ? { ...income, [field]: value } : income
      ),
    }));
  };

  const handleDeleteIncome = (id: number) => {
    setFamilyInfo((prev) => ({
      ...prev,
      additionalIncomes: prev.additionalIncomes.filter((income) => income.id !== id),
    }));
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Əlaqəli Şəxslər
      </Typography>

      {familyInfo.relatedPersons.map((person) => (
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

      {/* Ümumi iş təcrübəsi */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Ümumi iş təcrübəsi
      </Typography>
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Məs: 2 il, 10 ay"
            label="İş təcrübəsi (ay və il)"
            value={familyInfo.workExperience}
            onChange={(e) => setFamilyInfo((prev) => ({ ...prev, workExperience: e.target.value }))}
          />
        </CardContent>
      </Card>

      {/* Ailə tərkibi */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Ailə tərkibi
      </Typography>
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Məs: 2"
                label="Ailə üzvlərinin sayı"
                value={familyInfo.familyMembers}
                onChange={(e) =>
                  setFamilyInfo((prev) => ({ ...prev, familyMembers: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                placeholder="Məs: 1000 AZN"
                label="Ailənin ümumi gəliri (AZN)"
                value={familyInfo.familyIncome}
                onChange={(e) =>
                  setFamilyInfo((prev) => ({ ...prev, familyIncome: e.target.value }))
                }
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Kirayə məlumatları */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Yaşayış məlumatları
      </Typography>
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={familyInfo.isRenting}
                onChange={(e) =>
                  setFamilyInfo((prev) => ({ ...prev, isRenting: e.target.checked }))
                }
              />
            }
            label="Kirayə qalır"
          />
          {familyInfo.isRenting && (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Kirayə məbləği (AZN)"
                  value={familyInfo.rentAmount}
                  onChange={(e) =>
                    setFamilyInfo((prev) => ({ ...prev, rentAmount: e.target.value }))
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  placeholder="Məs: 1 il, 10 ay"
                  label="Kirayədə qalma müddəti"
                  value={familyInfo.rentDuration}
                  onChange={(e) =>
                    setFamilyInfo((prev) => ({ ...prev, rentDuration: e.target.value }))
                  }
                />
              </Grid>
            </Grid>
          )}
          <TextField
            fullWidth
            label="Faktiki yaşayış ünvanı"
            value={familyInfo.actualAddress}
            onChange={(e) => setFamilyInfo((prev) => ({ ...prev, actualAddress: e.target.value }))}
            sx={{ mt: 2 }}
          />
        </CardContent>
      </Card>

      {/* Qeyri-rəsmi gəlirlər */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Qeyri-rəsmi gəlirlər
      </Typography>
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          {familyInfo.additionalIncomes.map((income) => (
            <Grid container spacing={2} key={income.id} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  label="Gəlir mənbəyi"
                  size="small"
                  value={income.source}
                  onChange={(e) => handleIncomeChange(income.id, 'source', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  fullWidth
                  size="small"
                  label="Gəlir miqdarı (AZN)"
                  value={income.amount}
                  onChange={(e) => handleIncomeChange(income.id, 'amount', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteIncome(income.id)}
                  fullWidth
                >
                  Sil
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button variant="contained" onClick={handleAddIncome} sx={{ mt: 2 }}>
            Yeni gəlir əlavə et
          </Button>
        </CardContent>
      </Card>

      {/* Şəxsiyyət keyfiyyəti */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Şəxsiyyət keyfiyyəti
      </Typography>
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <Typography gutterBottom>Keyfiyyət şkalası (1-5)</Typography>
          <StyledRating
            size="large"
            highlightSelectedOnly
            name="highlight-selected-only"
            value={familyInfo.idQuality}
            onChange={(_, value) =>
              setFamilyInfo((prev) => ({ ...prev, idQuality: value as number }))
            }
            IconContainerComponent={IconContainer}
            getLabelText={(value: number) => customIcons[value].label}
          />
        </CardContent>
      </Card>

      {/* Ümumi qeyd */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Ümumi qeyd
      </Typography>
      <Card sx={{ mb: 4, p: 2 }}>
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Ümumi qeyd"
            value={familyInfo.generalNote}
            onChange={(e) => setFamilyInfo((prev) => ({ ...prev, generalNote: e.target.value }))}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default TabRelatedPersons;
