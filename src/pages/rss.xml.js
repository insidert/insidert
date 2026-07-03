import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE } from '../consts';
import { sortPostsByDate } from '../lib/posts';

export async function GET(context) {
	const posts = sortPostsByDate(await getCollection('notes'));
	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.updatedDate,
			link: `/notes/${post.id}/`,
		})),
	});
}
