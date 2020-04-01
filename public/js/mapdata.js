function get_intensity(quarantined_pop) {
	return quarantined_pop / 12500;
}

var simplemaps_countrymap_mapdata = {
	main_settings: {
		//General settings
		width: 'responsive', //or 'responsive'
		background_color: '#FFFFFF',
		background_transparent: 'yes',
		border_color: '#ffffff',
		pop_ups: 'detect',

		//State defaults
		state_description: 'State description',
		state_color: '#88A4BC',
		state_hover_color: '#D9D16F',
		state_url: '',
		border_size: 2,
		all_states_inactive: 'no',
		all_states_zoomable: 'no',

		//Location defaults
		location_description: 'Location description',
		location_url: '',
		location_color: '#FF0067',
		location_opacity: 0.8,
		location_hover_opacity: 1,
		location_size: 25,
		location_type: 'square',
		location_image_source: '',
		location_border_color: '#FFFFFF',
		location_border: 2,
		location_hover_border: 2.5,
		all_locations_inactive: 'no',
		all_locations_hidden: 'no',

		//Label defaults
		label_color: '#d5ddec',
		label_hover_color: '#d5ddec',
		label_size: 22,
		label_font: 'Arial',
		hide_labels: 'no',
		hide_eastern_labels: 'no',

		//Zoom settings
		zoom: 'yes',
		manual_zoom: 'no',
		back_image: 'no',
		initial_back: 'no',
		initial_zoom: '-1',
		initial_zoom_solo: 'no',
		region_opacity: 1,
		region_hover_opacity: 0.6,
		zoom_out_incrementally: 'yes',
		zoom_percentage: 0.99,
		zoom_time: 0.5,

		//Popup settings
		popup_color: 'white',
		popup_opacity: 0.9,
		popup_shadow: 1,
		popup_corners: 5,
		popup_font: '12px/1.5 Verdana, Arial, Helvetica, sans-serif',
		popup_nocss: 'no',

		//Advanced settings
		div: 'map',
		auto_load: 'yes',
		url_new_tab: 'yes',
		images_directory: 'default',
		fade_time: 0.1,
		link_text: 'View Website'
	},
	state_specific: {
		BGD1806: {
			name: 'Dhaka',
			description: 'Completed Home Quarantine: 6229<br>Home Quarantined: 12320<br>',
			color: '#BF6087',
			opacity: 0.15 + get_intensity(12320)
		},
		BGD2432: {
			name: 'Khulna',
			description: 'Completed Home Quarantine: 1128<br>Home Quarantined: 2218<br>',
			color: '#BF6087',
			opacity: 0.15 + get_intensity(2218)
		},
		BGD2475: {
			name: 'Barisal',
			description: 'Completed Home Quarantine: 3284<br>Home Quarantined: 9950<br>',
			color: '#BF6087',
			opacity: 0.15 + get_intensity(9950)
		},
		BGD2476: {
			name: 'Chittagong',
			description: 'Completed Home Quarantine: 8476<br>Home Quarantined: 7252<br>',
			color: '#BF6087',
			opacity: 0.15 + get_intensity(7252)
		},
		BGD2488: {
			name: 'Sylhet',
			description: 'Completed Home Quarantine: 1020<br>Home Quarantined: 2550<br>',
			color: '#BF6087',
			opacity: 0.15 + get_intensity(2550)
		},
		BGD3255: {
			name: 'Rajshahi',
			description: 'Completed Home Quarantine: 2056<br>Home Quarantined: 5818<br>',
			color: '#BF6087',
			opacity: 0.15 + get_intensity(5818)
		},
		BGD5492: {
			name: 'Rangpur',
			description: 'Completed Home Quarantine: 1238<br>Home Quarantined: 2585<br>',
			color: '#BF6087',
			opacity: 0.15 + get_intensity(2585)
		}
	},
	locations: {
		// '0': {
		// 	lat: '23.723056',
		// 	lng: '90.408611',
		// 	name: 'Somossha',
		// 	type: 'image',
		// 	image_url:
		// 		'https://img.favpng.com/14/24/14/icon-hospital-computer-icons-medicine-png-favpng-JscTfAXtMaXEst7npbB2NwJiH.jpg'
		// }
	}
};
