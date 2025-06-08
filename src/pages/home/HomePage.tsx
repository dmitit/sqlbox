import DefaultContainer from '@/ui/PrimaryContainer';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router';
import {
   TerminalSquare,
   Lock,
   Database,
   TableProperties,
   PlayCircle,
} from 'lucide-react';

export default function HomePage() {
   const navigate = useNavigate();

   const handleLaunchSandbox = () => {
      navigate('/sandbox/editor');
   };

   const features = [
      {
         icon: <TerminalSquare size={32} />,
         title: 'Powerful SQL Editor',
         description:
            'Write, execute, and manage SQL queries with a feature-rich Monaco-based editor.',
      },
      {
         icon: <Lock size={32} />,
         title: 'Local & Private',
         description:
            'All data processing happens in your browser. Your files and queries remain private.',
      },
      {
         icon: <Database size={32} />,
         title: 'DuckDB-WASM Powered',
         description:
            'Leverage the speed and analytical power of DuckDB, compiled to WebAssembly.',
      },
      {
         icon: <TableProperties size={32} />,
         title: 'Interactive UI',
         description:
            'Easily view database schemas, manage multiple query tabs, and see results instantly.',
      },
   ];

   const gettingStartedSteps = [
      {
         title: 'Launch the Sandbox',
         description:
            'Click the "Launch Sandbox" button to enter the SQLBox environment.',
      },
      {
         title: 'Write Your SQL',
         description:
            'Use the intuitive editor to craft your SQL queries. Create tables, insert data, or analyze datasets.',
      },
      {
         title: 'See Instant Results',
         description:
            'Execute your queries and view the output immediately. Explore schemas and manage your in-browser database with ease.',
      },
   ];

   return (
      <>
         {/* Hero Section */}
         <div className="bg-white dark:bg-gray-900">
            <DefaultContainer className="py-16 sm:py-24 text-center">
               <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  SQLBox: Your Local SQL{' '}
                  <span className="text-primary-600 dark:text-primary-500">
                     Playground
                  </span>
               </h1>
               <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                  Dive into data exploration with SQLBox. Run SQL queries,
                  manage tables, and analyze datasets directly in your browser,
                  powered by DuckDB-WASM. No backend, no complex setup, just
                  pure SQL.
               </p>
               <div className="mt-10">
                  <Button
                     variant="solid"
                     className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-lg font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                     onPress={handleLaunchSandbox}
                  >
                     <PlayCircle className="inline-block mr-2 h-6 w-6" />
                     Launch Sandbox
                  </Button>
               </div>
            </DefaultContainer>
         </div>

         {/* Features Section */}
         <div className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
            <DefaultContainer>
               <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                     Why{' '}
                     <span className="text-primary-600 dark:text-primary-500">
                        SQLBox
                     </span>
                     ?
                  </h2>
                  <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                     Everything you need for efficient, local data work, right
                     in your browser.
                  </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                     <div
                        key={index}
                        className="flex flex-col items-center p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                     >
                        <div className="p-4 bg-primary-100 dark:bg-primary-500/20 rounded-full text-primary-600 dark:text-primary-400 mb-4">
                           {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                           {feature.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                           {feature.description}
                        </p>
                     </div>
                  ))}
               </div>
            </DefaultContainer>
         </div>

         {/* Getting Started Section */}
         <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
            <DefaultContainer>
               <div className="text-center mb-12 sm:mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                     Get Started in{' '}
                     <span className="text-primary-600 dark:text-primary-500">
                        Seconds
                     </span>
                  </h2>
               </div>
               <div className="max-w-3xl mx-auto space-y-10">
                  {gettingStartedSteps.map((step, index) => (
                     <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-primary-600 dark:bg-primary-500 text-white font-bold text-xl sm:text-2xl mr-4 sm:mr-6">
                           {index + 1}
                        </div>
                        <div>
                           <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                              {step.title}
                           </h3>
                           <p className="mt-1 text-gray-600 dark:text-gray-300">
                              {step.description}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
               <div className="mt-16 text-center">
                  <Button
                     variant="solid"
                     className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 text-lg font-semibold rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                     onPress={handleLaunchSandbox}
                  >
                     Start Querying Now
                  </Button>
               </div>
            </DefaultContainer>
         </div>
      </>
   );
}
