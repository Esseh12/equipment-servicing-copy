// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
};

export const middlewareHeaders = {
	'Content-Type': 'application/json',
	'Cache-Control': 'no-cache',
	'Subscription-Key': process.env.NEXT_SECRET_MIDDLEWARE_SUBKEY as string,
};
