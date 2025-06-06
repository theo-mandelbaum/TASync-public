"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internetUsers = exports.usaPopulation = exports.population = void 0;
/**
 * Countries population
 */
//tslint:disable
exports.population = [
    { 'name': 'Afghanistan', 'value': bubblesize(32358260), 'color': '#7F38A0 ' },
    { 'name': 'Albania', 'value': bubblesize(32159880), 'color': '#2E769F' },
    { 'name': 'Algeria', 'value': bubblesize(35980193), 'color': '#816F28' },
    { 'name': 'Angola', 'value': bubblesize(19618432), 'color': '#816F28' },
    { 'name': 'Argentina', 'value': bubblesize(40764561), 'color': '#364A98' },
    { 'name': 'Armenia', 'value': bubblesize(3100236), 'color': '#2E769F' },
    { 'name': 'Australia', 'value': bubblesize(22605732), 'color': '  #257E7B ' },
    { 'name': 'Austria', 'value': bubblesize(8413429), 'color': '#2E769F' },
    { 'name': 'Azerbaijan', 'value': bubblesize(9306023), 'color': '#2E769F' },
    { 'name': 'Bangladesh', 'value': bubblesize(150493658), 'color': '#7F38A0 ' },
    { 'name': 'Belarus', 'value': bubblesize(9559441), 'color': '#2E769F' },
    { 'name': 'Belgium', 'value': bubblesize(10754056), 'color': '#2E769F' },
    { 'name': 'Benin', 'value': bubblesize(9099922), 'color': '#816F28' },
    { 'name': 'Bhutan', 'value': bubblesize(738267), 'color': '#7F38A0 ' },
    { 'name': 'Bolivia', 'value': bubblesize(10088108), 'color': '#364A98' },
    { 'name': 'Botswana', 'value': bubblesize(2030738), 'color': '#816F28' },
    { 'name': 'Brazil', 'value': bubblesize(196655014), 'color': '#364A98' },
    { 'name': 'Brunei', 'value': bubblesize(405938), 'color': '#7F38A0 ' },
    { 'name': 'Bulgaria', 'value': bubblesize(7446135), 'color': '#2E769F' },
    { 'name': 'Burkina Faso', 'value': bubblesize(16967845), 'color': '#816F28' },
    { 'name': 'Burundi', 'value': bubblesize(8575172), 'color': '#816F28' },
    { 'name': 'Cambodia', 'value': bubblesize(14305183), 'color': '#7F38A0 ' },
    { 'name': 'Cameroon', 'value': bubblesize(20030362), 'color': '#816F28' },
    { 'name': 'Canada', 'value': bubblesize(34349561), 'color': '#99295D ' },
    { 'name': 'Central African Rep.', 'value': bubblesize(4486837), 'color': '#816F28' },
    { 'name': 'Chad', 'value': bubblesize(11525496), 'color': '#816F28' },
    { 'name': 'Chile', 'value': bubblesize(17269525), 'color': '#364A98' },
    { 'name': 'China', 'value': bubblesize(1347565324), 'color': '#7F38A0 ' },
    { 'name': 'Colombia', 'value': bubblesize(46927125), 'color': '#364A98' },
    { 'name': 'Costa Rica', 'value': bubblesize(4726575), 'color': '#99295D ' },
    { 'name': 'Croatia', 'value': bubblesize(4395560), 'color': '#2E769F' },
    { 'name': 'Cuba', 'value': bubblesize(11253665), 'color': '#99295D' },
    { 'name': 'Cyprus', 'value': bubblesize(1116564), 'color': '#2E769F' },
    { 'name': 'Czech Rep.', 'value': bubblesize(10534293), 'color': '#2E769F' },
    { 'name': 'Denmark', 'value': bubblesize(5572594), 'color': '#2E769F' },
    { 'name': 'Djibouti', 'value': bubblesize(905564), 'color': '#816F28' },
    { 'name': 'Dominican Rep.', 'value': bubblesize(10056181), 'color': '#99295D ' },
    { 'name': 'Ecuador', 'value': bubblesize(14666055), 'color': '#364A98' },
    { 'name': 'Egypt', 'value': bubblesize(82536770), 'color': '#816F28' },
    { 'name': 'El Salvador', 'value': bubblesize(6227491), 'color': '#99295D ' },
    { 'name': 'Eritrea', 'value': bubblesize(5415280), 'color': '#816F28' },
    { 'name': 'Estonia', 'value': bubblesize(1340537), 'color': '#2E769F' },
    { 'name': 'Ethiopia', 'value': bubblesize(84734262), 'color': '#816F28' },
    { 'name': 'Fiji', 'value': bubblesize(868406), 'color': '  #257E7B ' },
    { 'name': 'Finland', 'value': bubblesize(5384770), 'color': '#2E769F' },
    { 'name': 'France', 'value': bubblesize(63125894), 'color': '#2E769F' },
    { 'name': 'Gabon', 'value': bubblesize(1534262), 'color': '#816F28' },
    { 'name': 'Gambia', 'value': bubblesize(1776103), 'color': '#816F28' },
    { 'name': 'Georgia', 'value': bubblesize(4329026), 'color': '#2E769F' },
    { 'name': 'Germany', 'value': bubblesize(82162512), 'color': '#2E769F' },
    { 'name': 'Ghana', 'value': bubblesize(24965816), 'color': '#816F28' },
    { 'name': 'Greece', 'value': bubblesize(11390031), 'color': '#2E769F' },
    { 'name': 'Guatemala', 'value': bubblesize(14757316), 'color': '#99295D ' },
    { 'name': 'Guinea', 'value': bubblesize(10221808), 'color': '#816F28' },
    { 'name': 'Guinea-Bissau', 'value': bubblesize(1547061), 'color': '#816F28' },
    { 'name': 'Guyana', 'value': bubblesize(756040), 'color': '#364A98' },
    { 'name': 'Haiti', 'value': bubblesize(10123787), 'color': '#99295D ' },
    { 'name': 'Honduras', 'value': bubblesize(7754687), 'color': '#99295D ' },
    { 'name': 'Hungary', 'value': bubblesize(9966116), 'color': '#2E769F' },
    { 'name': 'Iceland', 'value': bubblesize(324366), 'color': '#2E769F' },
    { 'name': 'India', 'value': bubblesize(1241491960), 'color': '#7F38A0 ' },
    { 'name': 'Indonesia', 'value': bubblesize(242325638), 'color': '#7F38A0 ' },
    { 'name': 'Iran', 'value': bubblesize(74798599), 'color': '#7F38A0 ' },
    { 'name': 'Iraq', 'value': bubblesize(32664942), 'color': '#7F38A0 ' },
    { 'name': 'Ireland', 'value': bubblesize(4525802), 'color': '#2E769F' },
    { 'name': 'Israel', 'value': bubblesize(7562194), 'color': '#7F38A0 ' },
    { 'name': 'Italy', 'value': bubblesize(60788694), 'color': '#2E769F' },
    { 'name': 'Jamaica', 'value': bubblesize(2751273), 'color': '#99295D ' },
    { 'name': 'Japan', 'value': bubblesize(126497241), 'color': '#7F38A0 ' },
    { 'name': 'Jordan', 'value': bubblesize(6330169), 'color': '#7F38A0 ' },
    { 'name': 'Kazakhstan', 'value': bubblesize(16206750), 'color': '#7F38A0 ' },
    { 'name': 'Kenya', 'value': bubblesize(41609728), 'color': '#816F28' },
    { 'name': 'Kuwait', 'value': bubblesize(2818042), 'color': '#7F38A0 ' },
    { 'name': 'Kyrgyzstan', 'value': bubblesize(5392580), 'color': '#7F38A0 ' },
    { 'name': 'Latvia', 'value': bubblesize(2243142), 'color': '#2E769F' },
    { 'name': 'Lebanon', 'value': bubblesize(4259405), 'color': '#7F38A0 ' },
    { 'name': 'Lesotho', 'value': bubblesize(2193843), 'color': '#816F28' },
    { 'name': 'Liberia', 'value': bubblesize(4128572), 'color': '#816F28' },
    { 'name': 'Libya', 'value': bubblesize(6422772), 'color': '#816F28' },
    { 'name': 'Lithuania', 'value': bubblesize(3307481), 'color': '#2E769F' },
    { 'name': 'Luxembourg', 'value': bubblesize(515941), 'color': '#2E769F' },
    { 'name': 'Madagascar', 'value': bubblesize(21315135), 'color': '#816F28' },
    { 'name': 'Malawi', 'value': bubblesize(15380888), 'color': '#816F28' },
    { 'name': 'Malaysia', 'value': bubblesize(28859154), 'color': '#7F38A0 ' },
    { 'name': 'Mali', 'value': bubblesize(15839538), 'color': '#816F28' },
    { 'name': 'Mauritania', 'value': bubblesize(3541540), 'color': '#816F28' },
    { 'name': 'Mexico', 'value': bubblesize(114793341), 'color': '#99295D ' },
    { 'name': 'Moldova', 'value': bubblesize(3544864), 'color': '#2E769F' },
    { 'name': 'Mongolia', 'value': bubblesize(2800114), 'color': '#7F38A0 ' },
    { 'name': 'Montenegro', 'value': bubblesize(632261), 'color': '#2E769F' },
    { 'name': 'Morocco', 'value': bubblesize(32272974), 'color': '#816F28' },
    { 'name': 'Mozambique', 'value': bubblesize(23929708), 'color': '#816F28' },
    { 'name': 'Myanmar', 'value': bubblesize(48336763), 'color': '#7F38A0 ' },
    { 'name': 'Namibia', 'value': bubblesize(2324004), 'color': '#816F28' },
    { 'name': 'Nepal', 'value': bubblesize(30485798), 'color': '#7F38A0 ' },
    { 'name': 'Netherlands', 'value': bubblesize(16664746), 'color': '#2E769F' },
    { 'name': 'New Zealand', 'value': bubblesize(4414509), 'color': '  #257E7B ' },
    { 'name': 'Nicaragua', 'value': bubblesize(5869859), 'color': '#99295D ' },
    { 'name': 'Niger', 'value': bubblesize(16068994), 'color': '#816F28' },
    { 'name': 'Nigeria', 'value': bubblesize(162470737), 'color': '#816F28' },
    { 'name': 'Norway', 'value': bubblesize(4924848), 'color': '#2E769F' },
    { 'name': 'Oman', 'value': bubblesize(2846145), 'color': '#7F38A0 ' },
    { 'name': 'Pakistan', 'value': bubblesize(176745364), 'color': '#7F38A0 ' },
    { 'name': 'Panama', 'value': bubblesize(3571185), 'color': '#99295D ' },
    { 'name': 'Papua New Guinea', 'value': bubblesize(7013829), 'color': '  #257E7B ' },
    { 'name': 'Paraguay', 'value': bubblesize(6568290), 'color': '#364A98' },
    { 'name': 'Peru', 'value': bubblesize(29399817), 'color': '#364A98' },
    { 'name': 'Philippines', 'value': bubblesize(94852030), 'color': '#7F38A0 ' },
    { 'name': 'Poland', 'value': bubblesize(38298949), 'color': '#2E769F' },
    { 'name': 'Portugal', 'value': bubblesize(10689663), 'color': '#2E769F' },
    { 'name': 'Puerto Rico', 'value': bubblesize(3745526), 'color': '#99295D ' },
    { 'name': 'Qatar', 'value': bubblesize(1870041), 'color': '#7F38A0 ' },
    { 'name': 'Romania', 'value': bubblesize(21436495), 'color': '#2E769F' },
    { 'name': 'Russia', 'value': bubblesize(142835555), 'color': '#2E769F' },
    { 'name': 'Rwanda', 'value': bubblesize(10942950), 'color': '#816F28' },
    { 'name': 'Saudi Arabia', 'value': bubblesize(28082541), 'color': '#7F38A0 ' },
    { 'name': 'Senegal', 'value': bubblesize(12767556), 'color': '#816F28' },
    { 'name': 'Serbia', 'value': bubblesize(9853969), 'color': '#2E769F' },
    { 'name': 'Sierra Leone', 'value': bubblesize(5997486), 'color': '#816F28' },
    { 'name': 'Slovenia', 'value': bubblesize(2035012), 'color': '#2E769F' },
    { 'name': 'Somalia', 'value': bubblesize(9556873), 'color': '#816F28' },
    { 'name': 'South Africa', 'value': bubblesize(50459978), 'color': '#816F28' },
    { 'name': 'Spain', 'value': bubblesize(46454895), 'color': '#2E769F' },
    { 'name': 'Sri Lanka', 'value': bubblesize(21045394), 'color': '#7F38A0 ' },
    { 'name': 'Sudan', 'value': bubblesize(34735288), 'color': '#816F28' },
    { 'name': 'Suriname', 'value': bubblesize(529419), 'color': '#364A98' },
    { 'name': 'Swaziland', 'value': bubblesize(1203330), 'color': '#816F28' },
    { 'name': 'Sweden', 'value': bubblesize(9440747), 'color': '#2E769F' },
    { 'name': 'Switzerland', 'value': bubblesize(7701690), 'color': '#2E769F' },
    { 'name': 'Syria', 'value': bubblesize(20766037), 'color': '#7F38A0 ' },
    { 'name': 'Taiwan', 'value': bubblesize(23072000), 'color': '#7F38A0 ' },
    { 'name': 'Tajikistan', 'value': bubblesize(6976958), 'color': '#7F38A0 ' },
    { 'name': 'Tanzania', 'value': bubblesize(46218486), 'color': '#816F28' },
    { 'name': 'Thailand', 'value': bubblesize(69518555), 'color': '#7F38A0 ' },
    { 'name': 'Togo', 'value': bubblesize(6154813), 'color': '#816F28' },
    { 'name': 'Trinidad and Tobago', 'value': bubblesize(1346350), 'color': '#99295D ' },
    { 'name': 'Tunisia', 'value': bubblesize(10594057), 'color': '#816F28' },
    { 'name': 'Turkey', 'value': bubblesize(73639596), 'color': '#2E769F' },
    { 'name': 'Turkmenistan', 'value': bubblesize(5105301), 'color': '#7F38A0 ' },
    { 'name': 'Uganda', 'value': bubblesize(34509205), 'color': '#816F28' },
    { 'name': 'Ukraine', 'value': bubblesize(45190180), 'color': '#2E769F' },
    { 'name': 'United Arab Emirates', 'value': bubblesize(7890924), 'color': '#7F38A0 ' },
    { 'name': 'United Kingdom', 'value': bubblesize(62417431), 'color': '#2E769F' },
    { 'name': 'United States', 'value': bubblesize(313085380), 'color': '#99295D ' },
    { 'name': 'Uruguay', 'value': bubblesize(3380008), 'color': '#364A98' },
    { 'name': 'Uzbekistan', 'value': bubblesize(27760267), 'color': '#7F38A0 ' },
    { 'name': 'Venezuela', 'value': bubblesize(29436891), 'color': '#364A98' },
    { 'name': 'Vietnam', 'value': bubblesize(88791996), 'color': '#7F38A0 ' },
    { 'name': 'Zambia', 'value': bubblesize(13474959), 'color': '#816F28' },
    { 'name': 'Zimbabwe', 'value': bubblesize(12754378), 'color': '#816F28' }
];
exports.usaPopulation = [
    { 'name': 'California', 'population': 37252895, 'color': '#004374' },
    { 'name': 'Texas', 'population': 25146105, 'color': '#3182bd' },
    { 'name': 'Florida', 'population': 18804623, 'color': '#4c96cb' },
    { 'name': 'New York', 'population': 19378087, 'color': '#4c96cb' },
    { 'name': 'Pennsylvania', 'population': 12702887, 'color': '#4c96cb' },
    { 'name': 'Illinois', 'population': 12831549, 'color': '#4c96cb' },
    { 'name': 'Ohio', 'population': 11536725, 'color': '#6ea7d2' },
    { 'name': 'Georgia', 'population': 9688681, 'color': '#6ea7d2' },
    { 'name': 'North Carolina', 'population': 9535692, 'color': '#6ea7d2' },
    { 'name': 'Michigan', 'population': 9884129, 'color': '#6ea7d2' },
    { 'name': 'New Jersey', 'population': 8791936, 'color': '#6ea7d2' },
    { 'name': 'Virginia', 'population': 8001045, 'color': '#90bad8' },
    { 'name': 'Washington', 'population': 6724543, 'color': '#90bad8' },
    { 'name': 'Arizona', 'population': 6392307, 'color': '#90bad8' },
    { 'name': 'Massachusetts', 'population': 6547817, 'color': '#90bad8' },
    { 'name': 'Tennessee', 'population': 6346275, 'color': '#90bad8' },
    { 'name': 'Indiana', 'population': 6484229, 'color': '#90bad8' },
    { 'name': 'Missouri', 'population': 5988927, 'color': '#90bad8' },
    { 'name': 'Maryland', 'population': 5773785, 'color': '#90bad8' },
    { 'name': 'Wisconsin', 'population': 5687289, 'color': '#90bad8' },
    { 'name': 'Colorado', 'population': 5029324, 'color': '#90bad8' },
    { 'name': 'Minnesota', 'population': 5303925, 'color': '#90bad8' },
    { 'name': 'South Carolina', 'population': 4625401, 'color': '#b0cde1' },
    { 'name': 'Alabama', 'population': 4780127, 'color': '#b0cde1' },
    { 'name': 'Louisiana', 'population': 4533479, 'color': '#b0cde1' },
    { 'name': 'Kentucky', 'population': 4339349, 'color': '#b0cde1' },
    { 'name': 'Oregon', 'population': 3831073, 'color': '#b0cde1' },
    { 'name': 'Oklahoma', 'population': 3751616, 'color': '#b0cde1' },
    { 'name': 'Connecticut', 'population': 3574118, 'color': '#b0cde1' },
    { 'name': 'Puerto Rico', 'population': 3726157, 'color': '#b0cde1' },
    { 'name': 'Iowa', 'population': 3046869, 'color': '#b0cde1' },
    { 'name': 'Utah', 'population': 2763888, 'color': '#b0cde1' },
    { 'name': 'Arkansas', 'population': 2915958, 'color': '#b0cde1' },
    { 'name': 'Nevada', 'population': 2700691, 'color': '#b0cde1' },
    { 'name': 'Mississippi', 'population': 2968103, 'color': '#b0cde1' },
    { 'name': 'Kansas', 'population': 2853132, 'color': '#b0cde1' },
    { 'name': 'New Mexico', 'population': 2059192, 'color': '#ecf3f7' },
    { 'name': 'Nebraska', 'population': 1826341, 'color': '#ecf3f7' },
    { 'name': 'West Virginia', 'population': 1853011, 'color': '#ecf3f7' },
    { 'name': 'Idaho', 'population': 1567652, 'color': '#ecf3f7' },
    { 'name': 'Hawaii', 'population': 1360301, 'color': '#ecf3f7' },
    { 'name': 'New Hampshire', 'population': 1316466, 'color': '#ecf3f7' },
    { 'name': 'Maine', 'population': 1328361, 'color': '#ecf3f7' },
    { 'name': 'Rhode Island', 'population': 1052931, 'color': '#ecf3f7' },
    { 'name': 'Montana', 'population': 989417, 'color': '#ecf3f7' },
    { 'name': 'Delaware', 'population': 897936, 'color': '#ecf3f7' },
    { 'name': 'South Dakota', 'population': 814191, 'color': '#ecf3f7' },
    { 'name': 'North Dakota', 'population': 672591, 'color': '#ecf3f7' },
    { 'name': 'Alaska', 'population': 710249, 'color': '#ecf3f7' },
    { 'name': 'District of Columbia', 'population': 601767, 'color': '#ecf3f7' },
    { 'name': 'Vermont', 'population': 625745, 'color': '#ecf3f7' },
    { 'name': 'Wyoming', 'population': 583767, 'color': '#ecf3f7' }
];
exports.internetUsers = [
    { 'rank': 1, 'name': 'China', 'value': bubblesize(746662194), 'color': '#7F38A0', 'population': 746662194 },
    { 'rank': 2, 'name': 'India', 'value': bubblesize(391292635), 'color': '#7F38A0 ', 'population': 391292635 },
    { 'rank': 3, 'name': 'United States', 'value': bubblesize(245436423), 'color': '#99295D ', 'population': 245436423 },
    { 'rank': 4, 'name': 'Brazil', 'value': bubblesize(123927230), 'color': '#364A98', 'population': 123927230 },
    { 'rank': 5, 'name': 'Japan', 'value': bubblesize(117528631), 'color': '#7F38A0 ', 'population': 117528631 },
    { 'rank': 6, 'name': 'Russia', 'value': bubblesize(110003284), 'color': '#2E769F', 'population': 110003284 },
    { 'rank': 7, 'name': 'Mexico', 'value': bubblesize(75937568), 'color': '#99295D ', 'population': 75937568 },
    { 'rank': 8, 'name': 'Germany', 'value': bubblesize(73436503), 'color': '#2E769F', 'population': 73436503 },
    { 'rank': 9, 'name': 'Indonesia', 'value': bubblesize(66244991), 'color': '#7F38A0 ', 'population': 66244991 },
    { 'rank': 10, 'name': 'United Kingdom', 'value': bubblesize(62354410), 'color': '#2E769F', 'population': 62354410 },
    { 'rank': 11, 'name': 'Philippines', 'value': bubblesize(57342723), 'color': '#7F38A0 ', 'population': 57342723 },
    { 'rank': 12, 'name': 'France', 'value': bubblesize(55413854), 'color': '#2E769F', 'population': 55413854 },
    { 'rank': 13, 'name': 'Nigeria', 'value': bubblesize(47743541), 'color': '#816F28', 'population': 47743541 },
    { 'rank': 14, 'name': 'South Africa', 'value': bubblesize(47094267), 'color': '#816F28', 'population': 47094267 },
    { 'rank': 15, 'name': 'Turkey', 'value': bubblesize(46395500), 'color': '#2E769F', 'population': 46395500 },
    { 'rank': 16, 'name': 'Vietnam', 'value': bubblesize(43974618), 'color': '#7F38A0 ', 'population': 43974618 },
    { 'rank': 17, 'name': 'Iran', 'value': bubblesize(42731675), 'color': '#7F38A0 ', 'population': 42731675 },
    { 'rank': 18, 'name': 'Egypt', 'value': bubblesize(37519531), 'color': '#816F28', 'population': 37519531 },
    { 'rank': 19, 'name': 'Spain', 'value': bubblesize(37337607), 'color': '#2E769F', 'population': 37337607 },
    { 'rank': 20, 'name': 'Italy', 'value': bubblesize(36442438), 'color': '#2E769F', 'population': 36442438 },
    { 'rank': 21, 'name': 'Thailand', 'value': bubblesize(32710169), 'color': '#7F38A0 ', 'population': 32710169 },
    { 'rank': 22, 'name': 'Canada', 'value': bubblesize(32602776), 'color': '#99295D ', 'population': 32602776 },
    { 'rank': 23, 'name': 'Argentina', 'value': bubblesize(30758972), 'color': '#364A98', 'population': 30758972 },
    { 'rank': 24, 'name': 'South Africa', 'value': bubblesize(30248355), 'color': '#816F28', 'population': 30248355 },
    { 'rank': 25, 'name': 'Pakistan', 'value': bubblesize(29965859), 'color': '#7F38A0 ', 'population': 29965859 },
    { 'rank': 26, 'name': 'Bangladesh', 'value': bubblesize(29738660), 'color': '#7F38A0 ', 'population': 29738660 },
    { 'rank': 27, 'name': 'Colombia', 'value': bubblesize(28287098), 'color': '#364A98', 'population': 28287098 },
    { 'rank': 28, 'name': 'Poland', 'value': bubblesize(28018492), 'color': '#2E769F', 'population': 28018492 },
    { 'rank': 29, 'name': 'Malaysia', 'value': bubblesize(24572446), 'color': '#7F38A0 ', 'population': 24572446 },
    { 'rank': 30, 'name': 'Saudi Arabia', 'value': bubblesize(23803319), 'color': '#7F38A0 ', 'population': 23803319 },
];
function bubblesize(value) {
    var max = 1347565324;
    var min = 324366;
    var maxBox = 70 * 70 * 2 * Math.PI;
    var minBox = 3 * 3 * 2 * Math.PI;
    var box = (value - min) / (max - min) * (maxBox - minBox) + minBox;
    if (box < minBox) {
        box = minBox;
    }
    return Math.sqrt(box / (Math.PI * 2)) / 2;
}
