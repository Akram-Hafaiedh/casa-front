import Chart from 'react-apexcharts'
interface DonutChartProps {
    series: number[];
    labels: string[];
    colors?: string[];
    height?: number;
    width?: number;
    title?: string;
    showTotalInCenter?: boolean;
    showLabelsWithNumbers?: boolean
    showCountsInLegend?: boolean
}
type LegendPosition = "bottom" | "top" | "right" | "left";

const DonutChart: React.FC<DonutChartProps> = ({
    series,
    labels,
    colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560'], // Default colors
    height=300,
    width= 400,
    title,
    showTotalInCenter = false,
    showLabelsWithNumbers = false,
    showCountsInLegend = false
}) => {
    const totalTasks = series.reduce((acc, curr) => acc + curr, 0);
    const chartOptions= {
        chart: {
            type: 'donut' as const,
            height: height,
            width: width,
        },
        labels: labels,
        legend: {
            show: !showCountsInLegend,
        },

        dataLabels: {
            enabled: true,
            formatter: (val: number, opts: { seriesIndex: number })=>{
                if(showLabelsWithNumbers){
                    const index = opts.seriesIndex;
                    return `${labels[index]}: ${series[index]}`
                }
                return `${val.toFixed(1)}%`;
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: showTotalInCenter,
                        total: {
                            show: showTotalInCenter,
                            label: 'Total Tasks',
                            formatter: () => `${totalTasks}`,
                            style: {
                                fontSize: '14px',
                                color: '#444',
                            }
                        }
                    },
                },
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                    },
                    legend: {
                        position: 'bottom' as LegendPosition,
                    },
                },
            },
        ],
        ...(title && {
            title: {
                text: title,
                align: 'center',
                fontSize: '16px',
            },
        }),
    }
    return (
        <div className="grid grid-cols-2 gap-4">
            <Chart 
                options={chartOptions}
                series={series}
                type="donut"
                width={width}
                height={height}
            />
            {showCountsInLegend && (
                <div className="flex flex-col items-between justify-center mx-2">
                {labels.map((label, index) => (
                    <div key={index} className="flex items-center mb-2">
                    <span
                        className="inline-block w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: colors[index] }}
                    ></span>
                    <span className="text-gray-600 font-medium">{label}</span>
                    <span className="ml-auto text-gray-800 font-semibold">
                        {series[index]}
                    </span>
                    </div>
                ))}
                </div>
            )}

        </div>
    )
}

export default DonutChart