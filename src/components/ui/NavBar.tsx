import { Link } from 'react-router-dom';
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from './navigation-menu';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
	const { user } = useAuth();
	return (
		<NavigationMenu className='p-4'>
			<div className='w-full'>
				<Link to='/' className='mr-4 w-full block'>
					<svg viewBox='0 0 688 150' fill='none' className='w-auto h-10'>
						<path
							d='M236.384 66.7623H200.18V70.3587H236.384V66.7623ZM236.384 41.028H200.18V44.7043H236.384V41.028ZM200.18 93.2957V96.972H236.384V93.2957H200.18Z'
							fill='#A7A29A'
						/>
						<path
							d='M280.84 41.028H276.764L251.03 96.972H255.425L278.762 45.5035L302.178 96.972H306.574L280.84 41.028Z'
							fill='#A19C93'
						/>
						<path
							d='M326.347 95.2937C330.023 96.7323 333.94 97.3716 338.095 97.3716C342.491 97.3716 346.247 96.7323 349.284 95.3736C352.321 94.0949 354.559 92.2567 355.997 90.019C357.436 87.7812 358.235 85.3037 358.235 82.5864C358.235 79.3097 357.356 76.6723 355.598 74.7543C353.84 72.8362 351.762 71.3177 349.364 70.3587C346.887 69.3996 343.61 68.4406 339.534 67.4016C335.858 66.5225 332.901 65.6434 330.823 64.8442C328.665 64.045 326.907 62.9261 325.468 61.4076C324.029 59.9691 323.31 57.9711 323.31 55.4136C323.31 52.1369 324.589 49.4196 327.306 47.3417C329.944 45.2638 333.86 44.2248 339.054 44.2248C341.612 44.2248 344.249 44.6244 346.967 45.4236C349.684 46.2228 352.161 47.4216 354.399 48.9401L355.918 45.6634C353.68 44.1449 351.122 42.9461 348.165 41.9871C345.128 41.1079 342.091 40.6284 339.054 40.6284C334.579 40.6284 330.903 41.3477 327.946 42.6264C324.989 43.9851 322.831 45.8232 321.392 48.061C319.954 50.2987 319.234 52.7763 319.234 55.4935C319.234 58.8502 320.033 61.5675 321.792 63.5655C323.55 65.5635 325.628 67.002 328.105 67.9611C330.583 68.9201 333.86 69.9591 338.015 70.9181C341.612 71.7972 344.489 72.5964 346.647 73.3956C348.725 74.1948 350.563 75.3936 352.001 76.8322C353.44 78.3507 354.159 80.3487 354.159 82.8262C354.159 86.1029 352.801 88.7403 350.083 90.7383C347.366 92.8162 343.29 93.7752 338.015 93.7752C334.339 93.7752 330.823 93.1359 327.466 91.8571C324.109 90.5784 321.472 88.8202 319.554 86.7423L317.716 89.7792C319.794 92.017 322.671 93.8551 326.347 95.2937Z'
							fill='#9A958D'
						/>
						<path
							d='M394.765 77.7113L417.303 41.028H413.067L392.847 73.9551L372.627 41.028H368.152L390.689 77.7113V96.972H394.765V77.7113Z'
							fill='#948F86'
						/>
						<path
							d='M491.32 46.063C487.324 42.7063 481.81 41.028 474.777 41.028H454.717V44.7043H474.777C480.691 44.7043 485.246 46.063 488.443 48.7003C491.56 51.3377 493.159 55.0939 493.159 59.8891C493.159 64.7643 491.56 68.5205 488.443 71.0779C485.246 73.7153 480.691 74.994 474.777 74.994H454.717V96.972H458.793V78.6703H474.777C481.81 78.6703 487.324 77.0719 491.32 73.7153C495.316 70.3587 497.314 65.8032 497.314 59.8891C497.314 54.055 495.316 49.4196 491.32 46.063Z'
							fill='#8E8980'
						/>
						<path
							d='M535.377 41.028H531.301L505.567 96.972H509.962L533.299 45.5035L556.715 96.972H561.111L535.377 41.028Z'
							fill='#888379'
						/>
						<path
							d='M607.417 77.3916C611.573 76.1928 614.85 74.1149 617.088 71.0779C619.326 68.041 620.524 64.3647 620.524 59.8891C620.524 54.055 618.526 49.4196 614.53 46.063C610.534 42.7063 605.02 41.028 597.987 41.028H577.927V44.7043H597.987C603.901 44.7043 608.456 46.063 611.653 48.7003C614.77 51.3377 616.369 55.0939 616.369 59.8891C616.369 64.7643 614.77 68.5205 611.653 71.1579C608.456 73.7952 603.901 75.0739 597.987 75.0739H577.927V96.972H582.003V78.6703H597.987C599.585 78.6703 601.424 78.5904 603.422 78.2707L616.768 96.972H621.404L607.417 77.3916Z'
							fill='#817C73'
						/>
						<path
							d='M658.809 69.3996L682.865 96.972H687.82L661.526 66.4426L686.142 41.028H681.186L646.261 76.992V41.028H642.186V96.972H646.261V82.2667L658.809 69.3996Z'
							fill='#7B766C'
						/>
						<rect
							x='0.180115'
							width={150}
							height={150}
							fill='url(#pattern0_65_3)'
						/>
						<defs>
							<pattern
								id='pattern0_65_3'
								patternContentUnits='objectBoundingBox'
								width={1}
								height={1}
							>
								<use xlinkHref='#image0_65_3' transform='scale(0.005)' />
							</pattern>
							<image
								id='image0_65_3'
								width={200}
								height={200}
								xlinkHref='data:image/png;base64,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'
							/>
						</defs>
					</svg>
				</Link>
			</div>
			{!user.id && (
				<>
					<NavigationMenuList className=''>
						<p>
							<svg
								
								viewBox='0 0 24 24'
								
								className='w-6 h-6'
							>
								<g>
									<path
										d='M13.5 4.18a.5.5 0 0 1-.5-.5V2c0-.551-.449-1-1-1s-1 .449-1 1v1.68a.5.5 0 0 1-1 0V2c0-1.103.897-2 2-2s2 .897 2 2v1.68a.5.5 0 0 1-.5.5zM12 24c-1.93 0-3.5-1.57-3.5-3.5a.5.5 0 0 1 1 0c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5a.5.5 0 0 1 1 0c0 1.93-1.57 3.5-3.5 3.5z'
										fill='#000000'
										opacity={1}
										data-original='#000000'
										
									/>
									<path
										d='M20.5 21h-17a1.502 1.502 0 0 1-.975-2.64A6.952 6.952 0 0 0 5 13.038V10c0-3.86 3.14-7 7-7s7 3.14 7 7v3.038c0 2.053.899 3.99 2.467 5.315A1.501 1.501 0 0 1 20.5 21zM12 4c-3.309 0-6 2.691-6 6v3.038a7.944 7.944 0 0 1-2.821 6.079A.5.5 0 0 0 3.5 20h17a.5.5 0 0 0 .325-.88A7.95 7.95 0 0 1 18 13.038V10c0-3.309-2.691-6-6-6z'
										fill='#000000'
										opacity={1}
										data-original='#000000'
										
									/>
								</g>
							</svg>
						</p>
						<Link to='/login'>
							<NavigationMenuLink className={navigationMenuTriggerStyle()}>
								Sign In
							</NavigationMenuLink>
						</Link>
					</NavigationMenuList>
				</>
			)}
		</NavigationMenu>
	);
};

export default Navbar;