import React from 'react';

export const AlertDialog = ({ open, onOpenChange, children }: { open: boolean; onOpenChange: (open: boolean) => void; children: React.ReactNode }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={() => onOpenChange(false)}>
      <div className="bg-white rounded-lg p-6" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export const AlertDialogContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
);

export const AlertDialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const AlertDialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

export const AlertDialogDescription = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-gray-700">{children}</p>
);

export const AlertDialogFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4 flex justify-end">{children}</div>
);

export const AlertDialogCancel = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <button onClick={onClick} className="mr-4 bg-gray-500 text-white py-2 px-4 rounded-md">
    {children}
  </button>
);

export const AlertDialogAction = ({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) => (
  <button onClick={onClick} disabled={disabled} className="bg-indigo-600 text-white py-2 px-4 rounded-md">
    {children}
  </button>
);
