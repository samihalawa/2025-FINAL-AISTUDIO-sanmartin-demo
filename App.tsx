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
          title: "Automated Birthday Greetings",
          description: "Automate birthday wishes for your team."
        };
      case 'reports':
        return {
          component: <HoursReportGenerator />,
          title: "Work Hours Report Generator",
          description: "Transform clock-in data into payroll-ready reports with AI."
        };
      case 'personnel':
        return {
          component: <PersonnelSearch />,
          title: "AI-Powered Personnel Search",
          description: "Screen and analyze candidate profiles against job criteria."
        };
       case 'portal':
        return {
          component: <EmployeePortal />,
          title: "Employee Portal",
          description: "Manage your vacation, absences, and documents in one place."
        };
      default:
        return {
          component: <EmployeePortal />,
          title: "Employee Portal",
          description: "Manage your vacation, absences, and documents in one place."
        };
    }
  };

  const { component, title, description } = getFeatureDetails();

  return (
    <div className="flex h-screen bg-brand-secondary font-sans text-brand-text">
      <Sidebar>
        <SidebarItem
          icon={<LayoutDashboard />}
          text="Employee Portal"
          active={activeFeature === 'portal'}
          onClick={() => setActiveFeature('portal')}
        />
        <SidebarItem
          icon={<Users />}
          text="Personnel Search"
          active={activeFeature === 'personnel'}
          onClick={() => setActiveFeature('personnel')}
        />
        <SidebarItem
          icon={<Clock />}
          text="Work Hours Report"
          active={activeFeature === 'reports'}
          onClick={() => setActiveFeature('reports')}
        />
        <SidebarItem
          icon={<Gift />}
          text="Birthday Automation"
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