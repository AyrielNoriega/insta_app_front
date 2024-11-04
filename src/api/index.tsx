import axios from 'axios';
// import { FinancialObligation } from '../interfaces/interfaces';

export const getPublications = async () => {


    // const config = {
    //     method: 'get',
    //     maxBodyLength: Infinity,
    //     url: 'http://127.0.0.1:8000/v1/financial-obligations',
    //     // responseType: 'stream',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     }
    // };


    try {
        // const response = await axios.request(config);

        const cardData = [
            {
                id: 1,
                img: 'https://picsum.photos/800/450?random=1',
                title: 'Revolutionizing software development with cutting-edge tools',
                content:
                'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
                author: 'Remy Sharp' 
            },
            {
                id: 2,
                img: 'https://picsum.photos/800/450?random=2',
                title: 'Innovative product features that drive success',
                content:
                'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
                author: 'Erica Johns'
            },
            {
                id: 3,
                img: 'https://picsum.photos/800/450?random=3',
                title: 'Designing for the future: trends and insights',
                content:
                'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
                author: 'Kate Morrison'
            },
            {
                id: 4,
                img: 'https://picsum.photos/800/450?random=4',
                title: "Our company's journey: milestones and achievements",
                content:
                "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
                author: 'Cindy Baker'
            },
            {
                id: 5,
                img: 'https://picsum.photos/800/450?random=45',
                title: 'Pioneering sustainable engineering solutions',
                content:
                "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
                author: 'Agnes Walker'
            },
            {
                id: 6,
                img: 'https://picsum.photos/800/450?random=6',
                title: 'Maximizing efficiency with our latest product updates',
                content:
                'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
                author: 'Travis Howard'
            },
        ];

        return cardData;
    } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
        throw error;
    }
};
