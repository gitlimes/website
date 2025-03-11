<script lang="ts">
	import * as m from '$lib/paraglide/messages.js';

	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/home/Hero.svelte';
	import Cardlist from '../lib/components/home/Cardlist.svelte';
	import ContactLinks from '../lib/components/home/Contactlinks.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Gradient from '$lib/components/Gradient.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="aniwrapper" id="aniwrapper">
	<Gradient />
	<div class="navwrapper section">
		<div class="inner">
			<Navbar />
		</div>
	</div>
	<div class="herowrapper section">
		<div class="inner">
			<Hero />
		</div>
	</div>
</div>
<div class="stuffwrapper section" id="stuff">
	<div class="inner">
		<h1><span class="coolspan">{m.stuff_header()}</span></h1>

		<Cardlist stats={data} />
	</div>
</div>

<div class="contact section" id="contact">
	<div class="inner">
		<ContactLinks />
	</div>
</div>

<div class="footer section">
	<div class="inner">
		<Footer />
	</div>
</div>

<style>
	.aniwrapper,
	.footer {
		position: relative;
		/*background: var(--pink);*/
		color: var(--bg-pink);
	}
	.aniwrapper .inner {
		z-index: 2;
	}

	.section {
		display: flex;
		justify-content: center;
		padding: 5rem 0;
	}
	.section .inner {
		width: 100%;
		max-width: min(var(--desktop-max-width), 90%);
	}
	.section.navwrapper {
		padding: 2.5rem 0;
	}
	.section.herowrapper {
		padding: 2.5rem 0 5rem;
	}
	.section.contact {
		padding: 5rem 0 10rem;
	}

	h1 {
		color: var(--pink);
	}

	@media screen and (max-width: 600px) {
		.section {
			padding: 2.5rem 0;
		}

		.section.contact {
		padding: 2.5rem 0 5rem;
	}
	}
</style>
