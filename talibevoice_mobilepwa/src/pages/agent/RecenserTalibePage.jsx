import { useState } from 'react'
import { User, Users, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import FormSection from '../../components/forms/FormSection'
import TextField from '../../components/forms/TextField'
import SelectField from '../../components/forms/SelectField'
import ToggleField from '../../components/forms/ToggleField'
import BottomNav from '../../components/layout/BottomNav'
import './RecenserTalibePage.css'

function RecenserTalibePage() {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    daara: '',
    niveau_etude: '',
    est_majeur: false,
  })

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleSubmit = () => {
    if (!form.nom || !form.prenom) {
      alert('Veuillez remplir au moins le nom et le prénom.')
      return
    }
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      navigate('/talibes')
    }, 2000)
  }

  if (success) {
    return (
      <div className="talibe-success">
        <CheckCircle2 size={64} color="var(--primary)" />
        <h2>Talibé enregistré !</h2>
        <p>Le recensement a été soumis avec succès.</p>
      </div>
    )
  }

  return (
    <div className="talibe-page">

      {/* Header */}
      <header className="page-header">
        <button className="page-header__back" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
        <span>Recenser un talibé</span>
        <div style={{ width: 20 }} />
      </header>

      <div className="page-content">

        {/* Informations personnelles */}
        <FormSection icon={<User size={18} />} title="Informations personnelles">
          <TextField
            label="Nom"
            placeholder="Entrez le nom"
            value={form.nom}
            onChange={(e) => handleChange('nom', e.target.value)}
          />
          <TextField
            label="Prénom"
            placeholder="Entrez le prénom"
            value={form.prenom}
            onChange={(e) => handleChange('prenom', e.target.value)}
          />
          <TextField
            label="Date de naissance"
            type="date"
            value={form.date_naissance}
            onChange={(e) => handleChange('date_naissance', e.target.value)}
          />
          <TextField
            label="Lieu de naissance"
            placeholder="Entrez le lieu"
            value={form.lieu_naissance}
            onChange={(e) => handleChange('lieu_naissance', e.target.value)}
          />
        </FormSection>

        {/* Situation */}
        <FormSection icon={<Users size={18} />} title="Situation">
          <SelectField
            label="Daara"
            options={['Sélectionnez le daara', 'Daara Touba', 'Daara Médina', 'Daara Kolda']}
            value={form.daara}
            onChange={(e) => handleChange('daara', e.target.value)}
          />
          <SelectField
            label="Niveau d'étude"
            options={['Sélectionnez le niveau', 'Débutant', 'Intermédiaire', 'Avancé']}
            value={form.niveau_etude}
            onChange={(e) => handleChange('niveau_etude', e.target.value)}
          />
          <ToggleField
            label="Est majeur ?"
            value={form.est_majeur}
            onChange={(val) => handleChange('est_majeur', val)}
          />
        </FormSection>

        {/* Documents */}
        <FormSection icon={<FileText size={18} />} title="Documents">
          <div className="upload-box">
            <FileText size={32} color="var(--primary)" />
            <p>Cliquez pour ajouter un document</p>
            <input type="file" />
          </div>
        </FormSection>

        <button className="save-btn" onClick={handleSubmit}>
          Enregistrer le talibé
        </button>

      </div>

      <BottomNav />
    </div>
  )
}

export default RecenserTalibePage