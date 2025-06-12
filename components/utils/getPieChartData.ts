type TaskPoint = {
    category: string;
    point: number;
};

type SummaryResponse = {
    total: number;
    user: string;
    byCategory: TaskPoint[] | null;
};


type PieChartData = {
    name: string;
    population: number;
};
const COLORS = [
    "#e1e78c",
    "#36a2eb",
    "#ff9f9f",
    "#82a158",
    "#fdb139",
    "#ce6bdf",
    "#96f5ff",
]
function getColorFromCategory(category: string): string {
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
        hash += category.charCodeAt(i);
    }
    return COLORS[hash % COLORS.length];
}

export const getPieChartData= (userName: string, summaries: SummaryResponse[]): PieChartData[] => {
    const userData = summaries.find(item => item.user === userName);

    if (!userData || !userData.byCategory) {
        // データなし or byCategory null なら空配列返す
        return [];
    }

    return userData.byCategory.map(({ category, point }) => ({
        name: category,
        population: point,
        color: getColorFromCategory(category),
        legendFontColor: "#333333",
        legendFontSize: 15
    }));
}