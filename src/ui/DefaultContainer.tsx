function DefaultContainer({ children }: { children: React.ReactNode }) {
   return (
      <>
         <div className="max-w-[1600px] mx-auto px-[0.8rem] relative">
            {children}
         </div>
      </>
   );
}

export default DefaultContainer;
