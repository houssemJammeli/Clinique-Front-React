import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../modules/Auth/Login";
import DashboardAdmin from "../modules/Admin/DashboardAdmin";
import Register from "../modules/Auth/Register";
import ListeClinique from "../modules/Clinique/ListeClinique";
import AjouterClinique from "../modules/Clinique/AjouterClinique";
import ModifierClinique from "../modules/Clinique/ModifierClinique";
import DashboardPatient from "../modules/Patient/DashboardPatient";
import DashboardMedecin from "../modules/Medecin/DashboardMedecin";
import DashboardReceptionniste from "../modules/Receptionniste/DashboardReceptionniste";
import ProtectedRoute from "../modules/Auth/ProtectedRoute";
import ModifierMedecin from "../modules/Medecin/ModifierMedecin";
import AjouterMedecin from "../modules/Medecin/AjouterMedecin";
import ListeMedecin from "../modules/Medecin/ListeMedecin";
import AjouterReceptionniste from "../modules/Receptionniste/AjouterReceptionniste";
import ModifierReceptionniste from "../modules/Receptionniste/ModifierReceptionniste";
import ListeReceptionniste from "../modules/Receptionniste/ListeReceptionniste";
import AjouterRendezVous from "../modules/RendezVous/AjouterRendezVous";
import ListeRendezVousReceptionniste from "../modules/RendezVous/ListeRendezVousReceptionniste";
import ListeRendezVousMedecin from "../modules/RendezVous/ListeRendezVousMedecin";
import ListeConsultationsMedecin from "../modules/Consultation/ListeConsultationsMedecin";
import ListeFacturesReceptionniste from "../modules/Facture/ListeFacturesReceptionniste";
import PatientLayout from "../modules/Layouts/PatientLayout";
import ReceptionnisteLayout from "../modules/Layouts/ReceptionnisteLayout";
import MedecinLayout from "../modules/Layouts/MedecinLayout";
import AdminLayout from "../modules/Layouts/AdminLayout";
import ListeOrdonnancesPatient from "../modules/Ordonnance/ListeOrdonnancesPatient";
import ListeRendezVousPatient from "../modules/RendezVous/ListeRendezVousPatient";
import ListeFacturesPatient from "../modules/Facture/ListeFacturesPatient";



export default function AppRoutes() {
  return (

    <Router>
      <Routes>
        {/* 🔓 Routes publiques */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🛡️ Routes Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="cliniques" element={<ListeClinique />} />
          <Route path="ajouter-clinique" element={<AjouterClinique />} />
          <Route path="modifier-clinique/:id" element={<ModifierClinique />} />
          <Route path="medecins" element={<ListeMedecin />} />
          <Route path="ajouter-medecin" element={<AjouterMedecin />} />
          <Route path="modifier-medecin/:id" element={<ModifierMedecin />} />
          <Route path="receptionnistes" element={<ListeReceptionniste />} />
          <Route path="ajouter-receptionniste" element={<AjouterReceptionniste />} />
          <Route path="modifier-receptionniste/:id" element={<ModifierReceptionniste />} />
        </Route>

        {/* 🩺 Routes Médecin */}
        <Route
          path="/medecin"
          element={
            <ProtectedRoute allowedRoles={["Medecin"]}>
              <MedecinLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardMedecin />} />
          <Route path="rendezvous" element={<ListeRendezVousMedecin />} />
          <Route path="consultations" element={<ListeConsultationsMedecin />} />
        </Route>

        {/* 👩‍⚕️ Routes Réceptionniste */}
        <Route
          path="/receptionniste"
          element={
            <ProtectedRoute allowedRoles={["Receptionniste"]}>
              <ReceptionnisteLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardReceptionniste />} />
          <Route path="rendezvous" element={<ListeRendezVousReceptionniste />} />
          <Route path="ajouter-rendezvous" element={<AjouterRendezVous />} />
          <Route path="factures" element={<ListeFacturesReceptionniste />} />
        </Route>

        {/* 👨‍⚕️ Routes Patient */}
        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRoles={["Patient"]}>
              <PatientLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPatient />} />
          <Route path="ordonnances" element={<ListeOrdonnancesPatient />} />
          <Route path="factures" element={<ListeFacturesPatient />} />
          <Route path="rendezvous" element={<ListeRendezVousPatient />} />
          {/*
          <Route path="rendezvous" element={<ListeRendezVousPatient />} />
          <Route path="ordonnances" element={<ListeOrdonnancesPatient />} />
          <Route path="factures" element={<ListeFacturesPatient />} />
          */}
        </Route>
      </Routes>
    </Router>
  );
}
    

  

    /*
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route
          path="/admin/cliniques"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ListeClinique />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ajouter-clinique"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AjouterClinique />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modifier-clinique/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ModifierClinique />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/medecins"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ListeMedecin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ajouter-medecin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AjouterMedecin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modifier-medecin/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ModifierMedecin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/receptionnistes"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ListeReceptionniste />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ajouter-receptionniste"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AjouterReceptionniste />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/modifier-receptionniste/:id"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <ModifierReceptionniste />
            </ProtectedRoute>
          }
        />

        <Route
          path="/receptionniste/rendezvous"
          element={
            <ProtectedRoute allowedRoles={["Receptionniste"]}>
              <ListeRendezVousReceptionniste />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionniste/ajouter-rendezvous"
          element={
            <ProtectedRoute allowedRoles={["Receptionniste"]}>
              <AjouterRendezVous />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionniste/factures"
          element={
            <ProtectedRoute allowedRoles={["Receptionniste"]}>
              <ListeFacturesReceptionniste />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medecin/rendezvous"
          element={
            <ProtectedRoute allowedRoles={["Medecin"]}>
              <ListeRendezVousMedecin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medecin/consultations"
          element={
            <ProtectedRoute allowedRoles={["Medecin"]}>
              <ListeConsultationsMedecin />
            </ProtectedRoute>
          }
        />


        

        
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Patient"]}>
              <DashboardPatient />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medecin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Medecin"]}>
              <DashboardMedecin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionniste/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Receptionniste"]}>
              <DashboardReceptionniste />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
    

  );
}
    //<Router>
    // <Routes>
    /* Auth */
    /* <Route path="/" element={<Login />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />

     <Route path="/admin/cliniques" element={<ListeClinique />} />
     <Route path="/admin/ajouter-clinique" element={<AjouterClinique />} />
     <Route path="/admin/modifier-clinique/:id" element={<ModifierClinique />} />*/

    /* Dashboards par rôle */
    /*<Route path="/admin/dashboard" element={<DashboardAdmin />} />
    <Route path="/patient/dashboard" element={<DashboardPatient />} /> 
    <Route path="/medecin/dashboard" element={<DashboardMedecin />} /> 
    <Route path="/receptionniste/dashboard" element={<DashboardReceptionniste />} /> */
    // </Routes>
    // </Router>
