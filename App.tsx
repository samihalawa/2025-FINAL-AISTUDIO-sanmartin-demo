import React, { useState } from 'react';
import BirthdayAutomation from './components/BirthdayAutomation';
import HoursReportGenerator from './components/HoursReportGenerator';
import PersonnelSearch from './components/PersonnelSearch';
import EmployeePortal from './components/EmployeePortal';
import { Sidebar, SidebarItem } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { Gift, Clock, Users, LayoutDashboard } from './components/common/Icons';

type Feature = 'birthdays' | 'reports' | 'personnel' | 'portal';

const App: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<Feature>('personnel');

  const getFeatureDetails = () => {
    switch (activeFeature) {
      case 'birthdays':
        return { 
          component: <BirthdayAutomation />,
          title: "Felicitaciones de Cumpleaños Automatizadas",
          description: "Automatiza las felicitaciones de cumpleaños para tu equipo."
        };
      case 'reports':
        return {
          component: <HoursReportGenerator />,
          title: "Generador de Informes de Horas de Trabajo",
          description: "Transforma los datos de fichajes en informes listos para la nómina con IA."
        };
      case 'personnel':
        return {
          component: <PersonnelSearch />,
          title: "Búsqueda de Personal con IA",
          description: "Evalúa y analiza perfiles de candidatos según los criterios del puesto."
        };
       case 'portal':
        return {
          component: <EmployeePortal />,
          title: "Portal del Empleado",
          description: "Gestiona tus vacaciones, ausencias y documentos en un solo lugar."
        };
      default:
        return {
          component: <EmployeePortal />,
          title: "Portal del Empleado",
          description: "Gestiona tus vacaciones, ausencias y documentos en un solo lugar."
        };
    }
  };

  const { component, title, description } = getFeatureDetails();

  return (
    <div className="flex h-screen bg-brand-secondary font-sans text-brand-text">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard />}
          text="Portal del Empleado"
          active={activeFeature === 'portal'}
          onClick={() => setActiveFeature('portal')}
        />
        <SidebarItem
          icon={<Users />}
          text="Búsqueda de Personal"
          active={activeFeature === 'personnel'}
          onClick={() => setActiveFeature('personnel')}
        />
        <SidebarItem
          icon={<Clock />}
          text="Informe de Horas"
          active={activeFeature === 'reports'}
          onClick={() => setActiveFeature('reports')}
        />
        <SidebarItem
          icon={<Gift />}
          text="Automatización de Cumpleaños"
          active={activeFeature === 'birthdays'}
          onClick={() => setActiveFeature('birthdays')}
        />
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeFeature !== 'personnel' && (
            <Header 
            title={title}
            description={description}
            />
        )}
        <main className={`flex-1 overflow-x-hidden overflow-y-auto ${activeFeature === 'personnel' ? '' : 'p-6 lg:p-8'}`}>
          {component}
        </main>
      </div>
    </div>
  );
};

export default App;