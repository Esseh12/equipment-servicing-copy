import Image from 'next/image';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
	isLoading: boolean;
	valueClassName?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	isLoading,
	valueClassName,
}) => {
	if (!isLoading) return null;

	return (
		<div
			className={`flex items-center justify-center bg-white z-50 ${valueClassName}`}>
			{/* fixed inset-0  */}
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.5 }}
				transition={{ duration: 0.5 }}
				className='flex flex-col items-center'>
				<Image
					src='/images/logo.png'
					alt='Access Bank Logo'
					width={300}
					height={300}
					className='animate-pulse'
				/>
				{/* <p className="mt-4 text-blue-600 text-lg font-semibold">Loading...</p> */}
			</motion.div>
		</div>
	);
};

export default LoadingSpinner;
