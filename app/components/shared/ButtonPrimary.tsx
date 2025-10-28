import React from 'react';
import RingLoading from './RingLoading';

interface ButtonPrimaryProps {
	onClick?: () => void;
	children: React.ReactNode;
	disabled?: boolean;
	noBg?: boolean;
	noBorder?: boolean;
	className?: string;
	type?: string;
	isLoading?: boolean;
}

const ButtonPrimary = ({
	onClick,
	children,
	disabled,
	noBg,
	className,
	noBorder,
	isLoading,
}: ButtonPrimaryProps) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`${disabled ? ' cursor-not-allowed bg-primaryBlue/50' : ''} ${
				noBg
					? `${noBorder ? '' : 'border-2 border-primaryBlue'} text-primaryBlue`
					: 'bg-primaryBlue text-white'
			}  px-4 py-2  font-inter font-semibold rounded-lg flex items-center justify-center gap-2 ${
				className && className
			}`}>
			{isLoading ? <RingLoading /> : children}
		</button>
	);
};

export default ButtonPrimary;
