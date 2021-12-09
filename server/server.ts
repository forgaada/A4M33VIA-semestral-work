import { oak, cors } from './deps.ts';

const port = 8080;

// @ts-ignore
const [app, router] = [new oak.Application(), new oak.Router()];

app.use(cors.oakCors());

function calculateBMI(height: any, weight: any) {
    return weight / ((height/100)*(height/100));
}

// @ts-ignore
router.get('/api/bmi', async ({ response, request }, next) => {
    const u = new URL(request.url.toString());
    let h = u.searchParams.get('height');
    let w = u.searchParams.get('weight');

    let bmiValue = Math.floor(calculateBMI(h,w));
    let bmiStatus;

    if (bmiValue < 18.5) {
        bmiStatus = "Podváha"
    } else if (bmiValue < 24.9) {
        bmiStatus = "Normální váha"
    } else if (bmiValue < 29.9) {
        bmiStatus = "Nadváha"
    } else {
        bmiStatus = "Obezita"
    }

    try {
        response.body = {
            result : bmiValue,
            status: bmiStatus
        };
        response.status = 200;
    } catch (error) {
        console.error(error);
        response.status = 500;
    }
});

app.use(router.routes());
// @ts-ignore
app.listen({ port });
console.info(`Running on port ${port}`);