import React from 'react';

interface PlaceholderImageProps {
	width?: string | number;
	height?: string | number;
	text?: string;
	className?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
	width = '100%',
	height = '100%',
	text = 'Your image here',
	className = '',
}) => {
	return (
		<div
			className={`flex items-center justify-center bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-4 ${className}`}
			style={{ width, height }}
		>
			<span className="text-gray-400 font-medium text-center text-sm sm:text-base">
				{text}
			</span>
		</div>
	);
};

export default PlaceholderImage;
