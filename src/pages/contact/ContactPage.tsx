import DefaultContainer from '@/ui/PrimaryContainer';
import { Mail, Send, Github, Globe } from 'lucide-react';

export default function ContactPage() {
   const contactInfo = [
      {
         icon: (
            <Mail
               size={24}
               className="text-primary-600 dark:text-primary-500"
            />
         ),
         label: 'Email',
         value: 'dmitrevnik@gmail.com',
         href: 'mailto:dmitrevnik@gmail.com',
      },
      {
         icon: (
            <Send
               size={24}
               className="text-primary-600 dark:text-primary-500"
            />
         ),
         label: 'Telegram',
         value: '@dmithead',
         href: 'https://t.me/dmithead',
      },
      {
         icon: (
            <Github
               size={24}
               className="text-primary-600 dark:text-primary-500"
            />
         ),
         label: 'GitHub',
         value: 'dmitit',
         href: 'https://github.com/dmitit',
      },
      {
         icon: (
            <Globe
               size={24}
               className="text-primary-600 dark:text-primary-500"
            />
         ),
         label: 'Official Website',
         value: 'dmit.com',
         href: 'https://dmit.com',
      },
   ];

   return (
      <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
         <DefaultContainer>
            <div className="max-w-3xl mx-auto text-center">
               <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
                  Contact Us
               </h1>
               <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                  SQLBox is proudly developed by{' '}
                  <span className="font-semibold text-primary-600 dark:text-primary-500">
                     dmit
                  </span>
                  .
               </p>
               <p className="mt-2 text-gray-600 dark:text-gray-300">
                  We'd love to hear from you! Whether you have a question,
                  feedback, or just want to say hi, feel free to reach out.
               </p>
            </div>

            <div className="mt-12 sm:mt-16 max-w-2xl mx-auto">
               <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                     <div
                        key={index}
                        className="flex items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                     >
                        <div className="flex-shrink-0 mr-4 rtl:ml-4 rtl:mr-0">
                           {item.icon}
                        </div>
                        <div>
                           <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {item.label}
                           </h3>
                           <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-1 text-primary-600 dark:text-primary-400 hover:underline break-all"
                           >
                              {item.value}
                           </a>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </DefaultContainer>
      </div>
   );
}
