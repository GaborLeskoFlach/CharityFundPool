import { IWSItemData } from '../../../components/wsCarousel/interfaces';
import addDays from '../../../utils/utils';


const newsItems : Array<IWSItemData> = [
 {
    ID : 1,
    Title : 'MyWS1',
    URL : '',
    WkspcAvatarImage : 'http://candidbelle.com/wp-content/uploads/2013/05/shutterstock_72655096-156x156.jpg',
    Created : addDays(new Date(), -20),
    WkspcType : 'Team'
 },
 {
	ID : 2,
	Title : 'MyWS2',
	URL : '',
	WkspcAvatarImage : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQvZ2egrSBAcPrZEKLnnYV5vpJAliJWEknTa4MSUqUyjZ2FccBH',
	Created : addDays(new Date(), -19),
	WkspcType : 'Team'
 },
 {
    ID : 3,
    Title : 'MyWS3',
    URL : '',
    WkspcAvatarImage : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSKJtMHCMI2494egbif7gqtmSXTrUJiH5Jd8k88_oJv0WcEvOf2',
    Created : addDays(new Date(), -18),
    WkspcType : 'Bid'
 },
 {
	ID : 4,
	Title : 'MyWS4',
	URL : '',
	WkspcAvatarImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3BGkQZ4LGI0F15z_a7kFalrWeaQWoPHHpFGIc4YXqWNNleLzHqw',
	Created : addDays(new Date(), -17),
	WkspcType : 'Bid'
 },
 {
    ID : 5,
    Title : 'MyWS5',
    URL : '',
    WkspcAvatarImage : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcREIdK5Ivv4lurMET5HcWdns1u8kAdmRw0gIZClk6T1A2SYr1MpYw',
    Created : addDays(new Date(), -16),
    WkspcType : 'Community'
 },
 {
	ID : 6,
	Title : 'MyWS6',
	URL : '',
	WkspcAvatarImage : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSAcjbYGdBynaJpu3f-wVaXoDqUmOxW_pwqPvG4wSY_UnbBRZEsEg',
	Created : addDays(new Date(), -15),
	WkspcType : 'Community'
 },
 {
    ID : 7,
    Title : 'MyWS7',
    URL : '',
    WkspcAvatarImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqd_RhZaWE4YIAC3TkgmeGV5CI6IPCzJ8u4x8Rl1f_Sa0GpBjY',
    Created : addDays(new Date(), -14),
    WkspcType : 'Project'
 },
 {
	ID : 8,
	Title : 'MyWS8',
	URL : '',
	WkspcAvatarImage : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRhP3-PN-bgRZSnDzkLlQQaSio99l9TLwfssSITjaZJ2qsly9sGcw',
	Created : addDays(new Date(), -13),
	WkspcType : 'Project'
 },
 {
    ID : 9,
    Title : 'MyWS9',
    URL : '',
    WkspcAvatarImage : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLfQi1KvlIM1QHTeD9NCKEMa7KRfQyiTTRfvq8R92lJcn2E8Q3yQ',
    Created : addDays(new Date(), -12),
    WkspcType : 'Contract'
 },
 {
	ID : 10,
	Title : 'MyWS10',
	URL : '',
	WkspcAvatarImage : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTworMJD9vdBHZ2YhHMXnbfqd0mTPsv84mo5DBIiyN5wMZgcCGn',
	Created : addDays(new Date(), -11),
	WkspcType : 'Contract'
 },
  {
    ID : 11,
    Title : 'MyWS11',
    URL : '',
    WkspcAvatarImage : 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcREIdK5Ivv4lurMET5HcWdns1u8kAdmRw0gIZClk6T1A2SYr1MpYw',
    Created : addDays(new Date(), -10),
    WkspcType : 'Team'
 },
 {
	ID : 12,
	Title : 'MyWS12',
	URL : '',
	WkspcAvatarImage : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSAcjbYGdBynaJpu3f-wVaXoDqUmOxW_pwqPvG4wSY_UnbBRZEsEg',
	Created : addDays(new Date(), -9),
	WkspcType : 'Bid'
 },
 {
    ID : 13,
    Title : 'MyWS13',
    URL : '',
    WkspcAvatarImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqd_RhZaWE4YIAC3TkgmeGV5CI6IPCzJ8u4x8Rl1f_Sa0GpBjY',
    Created : addDays(new Date(), -8),
    WkspcType : 'Contract'
 },
 {
	ID : 14,
	Title : 'MyWS14',
	URL : '',
	WkspcAvatarImage : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRhP3-PN-bgRZSnDzkLlQQaSio99l9TLwfssSITjaZJ2qsly9sGcw',
	Created : addDays(new Date(), -7),
	WkspcType : 'Community'
 },
 {
    ID : 15,
    Title : 'MyWS15',
    URL : '',
    WkspcAvatarImage : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSLfQi1KvlIM1QHTeD9NCKEMa7KRfQyiTTRfvq8R92lJcn2E8Q3yQ',
    Created : addDays(new Date(), -6),
    WkspcType : 'Team'
 } 
];

export default newsItems;