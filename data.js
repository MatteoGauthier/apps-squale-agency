const data = {
	title: "apps.squale.agency",
	apps: [
		{
			name: "squale-agency-showcase",
			domain: "squale.agency",
			description: "A simple, fast, and free static site generator.",
			productionUrl: "https://squale.agency/",
			deployHook: "https://api.vercel.com/v1/integrations/deploy/prj_pAI9YFkhvOnyHU4gsVhglv4yzd6r/9M3pObvRtA",
			screenshot: "https://vercel.com/api/screenshot?deploymentId=dpl_BgST1QWEEFeiaC3uSPK5GVbphaVV&withStatus=false",
			host: {
				name: "Vercel",
				id: "vercel",
				user: "matteogauthier",
				projectId: "squale-agency-showcase",
			},
			git: {
				url: "https://github.com/MatteoGauthier/squale-agency-showcase",
				branches: ["main"],
			},
		},
		{
			name: "ply",
			domain: "ply.vercel.app",
			description: "Spotify Player",
			productionUrl: "https://ply.vercel.app/",
			deployHook: "https://api.vercel.com/v1/integrations/deploy/prj_pAI9YFkhvOnyHU4gsVhglv4yzd6r/9M3pObvRtA",
			screenshot: "https://vercel.com/api/screenshot?deploymentId=dpl_BgST1QWEEFeiaC3uSPK5GVbphaVV&withStatus=false",
			host: {
				name: "Vercel",
				id: "vercel",
				user: "matteogauthier",
				projectId: "ply",
			},
			git: {
				url: "https://github.com/MatteoGauthier/ply",
				branches: ["main"],
			},
		},
	],
};

console.log(JSON.stringify(data));
export default data;
