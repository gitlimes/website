<script lang="ts">
	const props = $props();

	const { fillColor = 'var(--bg-pink)', bgColor = 'var(--pink)', size = 24, hero = false } = props;
</script>

<svg
	height={size}
	viewBox={!hero ? '0 0 135 31' : '0 0 140 31'}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	aria-label="limes.pink"
	{...props}
>
	<rect x="0" y="-2.5" width="135" height="24.1" fill={bgColor} />
	<text
		fill={fillColor}
		xml:space="preserve"
		style="white-space: pre"
		font-family="Space Grotesk Variable"
		font-size="24"
		font-weight="bold"
		letter-spacing="-0.05em"
		transform="translate(1 0)"
		><tspan x="28.0469" y="23.6087"
			>limes.pink{#if hero}:{/if}</tspan
		></text
	>
	<circle cx="12" cy="15.8" r="9" fill={bgColor} />
	<g clip-path="url(#clip0_160_22)" transform="translate(1 0)">
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M3.69683 5.40617C3.6847 5.40076 3.67515 5.39649 3.66826 5.3934C3.0933 5.13565 2.61745 5.27444 2.14161 5.96838C1.38819 7.09851 -1.98237 14.1172 1.66577 19.6886C4.63979 24.2289 10.8456 25.7159 15.723 25.0814C23.0202 24.1097 23.4699 19.0735 23.6698 16.8343C23.6779 16.7434 23.6856 16.657 23.6934 16.5757C23.8713 14.7366 23.8324 14.3571 23.3009 14.119C20.3412 19.5097 11.4062 25.7846 4.74842 21.5244C-1.53605 17.5198 1.11959 8.69818 3.69683 5.40617Z"
			fill={fillColor}
		/>
		<path
			d="M10.3499 9.91392L3.07344 12.0155C2.57778 12.1742 2.20107 12.5707 2.0821 13.0664C1.70539 14.7517 2.24072 17.686 3.8467 18.9748C4.54064 19.5101 5.55179 19.3316 5.98799 18.5584L10.8059 10.588C11.0637 10.2509 10.905 9.7553 10.3499 9.91392Z"
			fill={fillColor}
		/>
		<path
			d="M13.1848 10.4889C13.1848 10.4889 16.0795 16.4568 16.3571 17.0318C16.6347 17.6067 17.6062 17.9636 18.32 17.5869C20.4414 16.4766 21.3931 15.1284 22.1267 13.5819C20.3621 12.8086 13.7201 9.85445 13.7201 9.85445C13.2443 9.63633 12.927 9.97339 13.1848 10.4889Z"
			fill={fillColor}
		/>
		<path
			d="M11.4801 10.8656C11.1629 11.4009 7.03887 18.5188 6.66217 19.1334C6.28546 19.7679 6.52337 20.6204 7.19749 20.9574C9.6362 22.2462 13.324 21.0368 15.0489 19.5696C15.4851 19.1929 15.9411 18.5584 15.6834 17.9438C15.4256 17.3291 12.868 11.3018 12.6499 10.8458C12.4119 10.3105 11.837 10.2906 11.4801 10.8656Z"
			fill={fillColor}
		/>
		<path
			d="M10.6275 8.46657C8.98192 7.73298 5.7898 6.3451 4.75883 5.88908C4.04506 6.32527 2.83561 8.14933 2.53821 10.0924C2.41924 10.8061 2.87526 11.2622 3.58903 11.0639C3.58903 11.0639 10.2707 9.21998 10.5879 9.14069C10.9051 9.04154 10.9844 8.62518 10.6275 8.46657Z"
			fill={fillColor}
		/>
	</g>
	<defs>
		<clipPath id="clip0_160_22">
			<rect width="24" height="20.2597" fill="white" transform="translate(0 5)" />
		</clipPath>
	</defs>
</svg>

<style>
	svg {
		overflow: visible;
	}
	svg * {
		transition: fill 300ms;
	}
</style>
