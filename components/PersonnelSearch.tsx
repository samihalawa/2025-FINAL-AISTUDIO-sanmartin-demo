import React, { useState } from 'react';
import { 
    Share, Duplicate, Export, Clock, MessageSquare, CreditCard, ChevronDown, 
    Filter, ArrowUpDown, Code, Bell, Pencil, Plus, Slash, ExternalLink, X, Search,
} from './common/Icons';

interface Company {
  id: number;
  logoUrl: string;
  name: string;
  description: string;
  url: string;
}

const MOCK_COMPANY_DATA: Company[] = [
    { id: 1, name: 'Pryconsa', description: 'Empresa inmobiliaria privada española fundada en 1965, con 178 empleados e ingresos anuales de $365K; se especializa en la compra, venta y alquiler de propiedades en España...', url: 'https://pryconsa.es', logoUrl: 'https://logo.clearbit.com/pryconsa.es' },
    { id: 2, name: 'Vitruvio Socimi', description: 'Empresa inmobiliaria privada española fundada en 2014; gestiona carteras de propiedades con un enfoque en activos de alquiler urbano; 16 empleados con un crecimiento interanual del 14.3%...', url: 'https://vitruviosocimi.com', logoUrl: 'https://logo.clearbit.com/vitruviosocimi.com' },
    { id: 3, name: 'López Real Inversiones 21', description: 'Empresa inmobiliaria privada española enfocada en el desarrollo e inversión de locales comerciales; con 22 empleados, fundada en 2021 y con sede en España...', url: 'https://lopezrealinversiones21.com', logoUrl: 'https://logo.clearbit.com/lopezrealinversiones21.com' },
    { id: 4, name: 'LandCo - Grupo Santander', description: 'Empresa inmobiliaria privada española fundada en 2019, con 70 empleados y un crecimiento anual del 28.9%; se especializa en la gestión de suelo, transformación urbana y desarrollo inmobiliario en España.', url: 'https://landco.es', logoUrl: 'https://logo.clearbit.com/landco.es' },
    { id: 5, name: 'GRC IM', description: 'Empresa inmobiliaria privada española con sede en Madrid y Lisboa, fundada en 2022, con 12 empleados y un descenso interanual del 20% en la plantilla.', url: 'https://grcim.com', logoUrl: 'https://ui-avatars.com/api/?name=G&background=random' },
    { id: 6, name: 'Caralca Real Estate', description: 'Empresa inmobiliaria privada española fundada en 2018, especializada en proyectos de obra nueva en Andalucía con más de 1.000 viviendas construidas.', url: 'https://caralca.es', logoUrl: 'https://logo.clearbit.com/caralca.es' },
    { id: 7, name: 'LIBRA Gestión de Proyectos', description: 'Empresa inmobiliaria privada española fundada en 1998; gestiona proyectos cooperativos y de promoción inmobiliaria con más de 6.000 viviendas promovidas.', url: 'https://libragp.com', logoUrl: 'https://logo.clearbit.com/libragp.com' },
    { id: 8, name: 'Grupo Gmp', description: 'Empresa inmobiliaria española que cotiza en bolsa, fundada en 1979, con 63 empleados y un crecimiento interanual del 6.2%; ingresos anuales de $25M-$50M.', url: 'https://grupogmp.com', logoUrl: 'https://logo.clearbit.com/grupogmp.com' },
    { id: 9, name: 'Galivivienda', description: 'Cooperativa inmobiliaria española especializada en proyectos de vivienda asequible; las actividades reportadas incluyen cambios en los requisitos financieros de los miembros.', url: 'https://galivivienda.com', logoUrl: 'https://logo.clearbit.com/galivivienda.com' },
    { id: 10, name: 'Grupo Nido Capital', description: 'Holding inmobiliario privado español con 22 empleados y un crecimiento interanual del 10%, especializado en proyectos residenciales, coliving, senior living, turismo y terciarios.', url: 'https://nidogrupo.com', logoUrl: 'https://logo.clearbit.com/nidogrupo.com' },
];

const PersonnelSearch: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Buscar');
    const [companies] = useState<Company[]>(MOCK_COMPANY_DATA);

    return (
        <div className="flex flex-col lg:flex-row h-full gap-4 max-h-[calc(100vh-1rem)] bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
            {/* Main content */}
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center">
                        <h2 className="font-semibold text-slate-800 dark:text-slate-100 mr-2">Empresas: España, transacciones inmobiliarias recientes...</h2>
                        <button className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"><ChevronDown className="h-5 w-5" /></button>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button className="btn-header"><Share className="h-5 w-5" /> <span className="hidden sm:inline ml-1.5">Compartir</span></button>
                        <button className="btn-header"><Duplicate className="h-5 w-5" /> <span className="hidden sm:inline ml-1.5">Duplicar</span></button>
                        <button className="btn-header"><Export className="h-5 w-5" /> <span className="hidden sm:inline ml-1.5">Exportar</span></button>
                        <button className="btn-header"><Clock className="h-5 w-5" /> <span className="hidden sm:inline ml-1.5">Historial</span></button>
                        <div className="h-6 border-l border-slate-300 dark:border-slate-600 mx-2"></div>
                        <button className="btn-header-light"><MessageSquare className="h-5 w-5" /> <span className="hidden sm:inline ml-1.5">Feedback</span></button>
                        <button className="btn-header-light"><CreditCard className="h-5 w-5" /> <span className="hidden sm:inline ml-1.5">Créditos</span></button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="p-2 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 flex-wrap">
                    <button className="btn-toolbar"><Filter className="h-4 w-4 mr-1.5" /> Filtrar</button>
                    <button className="btn-toolbar"><ArrowUpDown className="h-4 w-4 mr-1.5" /> Ordenar</button>
                    <button className="btn-toolbar"><Code className="h-4 w-4 mr-1.5" /> Obtener Código</button>
                    <div className="h-6 border-l border-slate-300 dark:border-slate-600 mx-1"></div>
                    <button className="btn-toolbar"><Bell className="h-4 w-4 mr-1.5" /> Monitorizar Nuevas Empresas</button>
                    <button className="btn-primary"><Pencil className="h-5 w-5 mr-1" /> Añadir Enriquecimiento</button>
                </div>
                
                {/* Table */}
                <div className="flex-1 overflow-y-auto">
                    <div className="grid grid-cols-[auto_2fr_3fr_2fr_2fr] gap-4 p-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
                        <input className="form-checkbox rounded bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-sky-600 focus:ring-sky-500" type="checkbox" />
                        <span>Nombre</span>
                        <span>Descripción</span>
                        <span>URL</span>
                        <span>Es una empresa española...</span>
                    </div>
                    <div>
                        {companies.map((company, index) => (
                             <div key={company.id} className="grid grid-cols-[auto_2fr_3fr_2fr_2fr] gap-4 items-center p-4 border-b border-slate-200 dark:border-slate-700 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                                    <input className="form-checkbox rounded bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-sky-600 focus:ring-sky-500" type="checkbox" />
                                    <span>{index + 1}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <img alt={`${company.name} logo`} className="h-6 w-6 rounded-md object-contain" src={company.logoUrl} />
                                    <span className="font-medium text-slate-800 dark:text-slate-200">{company.name}</span>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 truncate" title={company.description}>{company.description}</p>
                                <a href={`http://${company.url}`} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline truncate dark:text-sky-400">{company.url}</a>
                                <div><span className="px-2 py-1 text-xs font-semibold rounded-md bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">Coincide</span></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

             {/* Sidebar */}
            <div className="w-full lg:w-[400px] flex-shrink-0 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col">
                <div className="flex border-b border-slate-200 dark:border-slate-700">
                    <button onClick={() => setActiveTab('Buscar')} className={`flex-1 p-3 font-semibold text-sm ${activeTab === 'Buscar' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-500 dark:text-slate-400'}`}>Buscar</button>
                    <button onClick={() => setActiveTab('Detalles')} className={`flex-1 p-3 font-semibold text-sm ${activeTab === 'Detalles' ? 'text-sky-600 border-b-2 border-sky-600' : 'text-slate-500 dark:text-slate-400'}`}>Detalles</button>
                </div>
                <div className="p-4 space-y-6 overflow-y-auto flex-1 flex flex-col">
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold mb-2 text-slate-800 dark:text-slate-100">Criterios</h3>
                            <div className="p-3 border border-slate-200 dark:border-slate-600 rounded-lg space-y-2">
                                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded text-sm">empresas en españa que hayan tenido en últimos 12 meses transacción inmobiliaria publicada en noticias</div>
                                <div className="p-2 border-l-2 border-purple-500 text-sm">es una empresa inmobiliaria española.</div>
                                <div className="p-2 border-l-2 border-orange-500 text-sm">se informó de una transacción inmobiliaria que involucra a la empresa en un artículo...</div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <button className="btn-sidebar-link"><Plus className="w-4 h-4 mr-1" /> Añadir Criterio</button>
                                <button className="btn-sidebar-link"><Slash className="h-4 w-4 mr-1"/> Excluir Empresas</button>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold mb-2 text-slate-800 dark:text-slate-100">Enriquecimientos</h3>
                            <div className="flex flex-wrap gap-2">
                                <button className="btn-enrichment-active">Email del Decisor <X className="h-3 w-3 ml-1" /></button>
                                <button className="btn-enrichment-active">CEO LinkedIn <X className="h-3 w-3 ml-1" /></button>
                                <button className="btn-enrichment">Tamaño</button>
                                <button className="btn-enrichment">Ingresos</button>
                                <button className="btn-enrichment">URL de LinkedIn del CEO</button>
                                <button className="btn-enrichment">Industria</button>
                                <button className="btn-sidebar-link text-sm"><Plus className="w-3 h-3 mr-1" /> Personalizado</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto border-t border-slate-200 dark:border-slate-700 pt-4 space-y-4">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Encontrar más resultados</h3>
                        <div className="flex items-center gap-2">
                            <input className="input-sidebar w-16" type="text" defaultValue="25" />
                            <input className="input-sidebar w-16 bg-slate-200 dark:bg-slate-700" type="text" defaultValue="100" />
                            <input placeholder="Personalizado..." className="input-sidebar flex-1" type="text" />
                            <button className="btn-sidebar-link">Todo <ExternalLink className="h-4 w-4 ml-1" /></button>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex justify-between">
                            <span>24 coincidencias</span><span>121 analizadas</span>
                        </div>
                        <button className="w-full btn-toolbar justify-center py-2.5"><Search className="h-4 w-4 mr-2" />Encontrar personas de empresas</button>
                    </div>
                </div>
            </div>
            <style>{`
                .btn-header { display: inline-flex; align-items: center; padding: 6px 10px; font-size: 14px; font-weight: 500; color: #475569; border: 1px solid #cbd5e1; border-radius: 6px; transition: all 0.2s; }
                .dark .btn-header { color: #94a3b8; border-color: #475569; }
                .btn-header:hover { background-color: #f1f5f9; }
                .dark .btn-header:hover { background-color: #334155; }
                
                .btn-header-light { display: inline-flex; align-items: center; padding: 6px 10px; font-size: 14px; font-weight: 500; color: #475569; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; transition: all 0.2s; }
                .dark .btn-header-light { color: #94a3b8; background-color: #1e293b; border-color: #334155; }
                .btn-header-light:hover { border-color: #cbd5e1; }
                .dark .btn-header-light:hover { border-color: #475569; }

                .btn-toolbar { display: inline-flex; align-items: center; padding: 6px 12px; font-size: 14px; font-weight: 500; color: #334155; background-color: #fff; border: 1px solid #e2e8f0; border-radius: 6px; transition: all 0.2s; }
                .dark .btn-toolbar { color: #cbd5e1; background-color: #1e293b; border-color: #334155; }
                .btn-toolbar:hover { background-color: #f8fafc; }
                .dark .btn-toolbar:hover { background-color: #334155; }
                
                .btn-primary { display: inline-flex; align-items: center; padding: 6px 12px; font-size: 14px; font-weight: 500; color: #fff; background-color: #0ea5e9; border: 1px solid #0ea5e9; border-radius: 6px; transition: all 0.2s; }
                .btn-primary:hover { background-color: #0284c7; }

                .btn-sidebar-link { font-size: 14px; font-weight: 500; color: #0ea5e9; background: transparent; border: none; display: inline-flex; align-items: center; cursor: pointer; }
                .btn-sidebar-link:hover { text-decoration: underline; }

                .btn-enrichment { padding: 4px 10px; font-size: 13px; font-weight: 500; color: #334155; background-color: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 16px; }
                .dark .btn-enrichment { color: #cbd5e1; background-color: #334155; border-color: #475569; }

                .btn-enrichment-active { display: inline-flex; align-items: center; padding: 4px 10px; font-size: 13px; font-weight: 500; color: #0ea5e9; background-color: #f0f9ff; border: 1px solid #7dd3fc; border-radius: 16px; }
                .dark .btn-enrichment-active { color: #7dd3fc; background-color: #0c4a6e; border-color: #0ea5e9; }
                
                .input-sidebar { padding: 6px 10px; font-size: 14px; color: #111827; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; }
                .dark .input-sidebar { color: #f9fafb; background-color: #1e293b; border-color: #334155; }
                .dark .input-sidebar::placeholder { color: #9ca3af; }

                .form-checkbox { border-color: #D1D5DB; color: #0ea5e9; }
                .form-checkbox:focus { ring: #0ea5e9; ring-offset: 0; }
                .dark .form-checkbox { border-color: #4B5563; background-color: #374151; }
            `}</style>
        </div>
    );
};

export default PersonnelSearch;