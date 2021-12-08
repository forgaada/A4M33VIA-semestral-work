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

    try {
        response.body = {
            result : Math.floor(calculateBMI(h,w))
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