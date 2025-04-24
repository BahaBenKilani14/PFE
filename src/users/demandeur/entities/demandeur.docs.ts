import { createPropertyDocs, PropTypes } from '../../../utils/entity-doc-generator';

export const DemandeurProperties = createPropertyDocs({
  id: PropTypes.id,
  nom: { description: 'First name', example: 'Jean' },
  prenom: { description: 'Last name', example: 'Dupont' },
  email: PropTypes.email,
  telephone: PropTypes.phone,
  motDePasse: PropTypes.password,
  adress: { ...PropTypes.address, required: false },
  préférenceAlimentaire: { 
    description: 'Food preference', 
    example: 'Végétarien',
    required: false 
  },
  commandes: { 
    description: 'Orders made by this user',
    type: 'array', 
    isArray: true,
    required: false 
  },
  avisLaissés: { 
    description: 'Reviews left by this user',
    type: 'array', 
    isArray: true,
    required: false 
  },
  paiements: { 
    description: 'Payments made by this user',
    type: 'array', 
    isArray: true,
    required: false 
  },
}); 