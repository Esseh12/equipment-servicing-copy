import React from 'react';

interface LoadingDialogProps {
	loading: boolean;
	error?: string | null;
}

const LoadingDialog: React.FC<LoadingDialogProps> = ({ loading, error }) => {
	if (!loading && !error) return null; // Hide if no loading or error

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
			<div className='bg-transparent p-6 rounded-lg text-center animate-fadeIn'>
				{loading ? (
					<div className='flex flex-col items-center'>
						<div className='animate-spin rounded-full h-20 w-20 border-t-4 border-orange-500 border-solid'></div>
						<p className='mt-2 text-white'>Processing Request.</p>
					</div>
				) : (
					<div className='text-red-600'>
						<p className='font-bold'>Error</p>
						<p className='text-sm'>{error}</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default LoadingDialog;
