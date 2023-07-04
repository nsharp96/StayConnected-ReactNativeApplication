import React, { useContext, useEffect, useState } from "react"
import { auth, db, storage } from '../config/firebase';
import { addDoc, collection, doc, setDoc, getDoc, updateDoc, query, where, getDocs, orderBy, limit, Firestore, deleteDoc } from "firebase/firestore";
import uuid from 'react-native-uuid';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, uploadBytes, connectStorageEmulator } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";
import { FieldValue, increment } from "firebase/firestore";

const GroupContext = React.createContext();

export function GroupContextProvider({children}) {

    const [ currentGroup, setCurrentGroup ] = useState({
        GroupDescription: '',
        GroupName: '',
        GroupMembers: '',
        GroupPicture: '',
    });
    const [ currentEvent, setCurrentEvent ] = useState({
        EventDetails: '',
        EventEnd: '',
        EventLimit: '',
        EventLocation: '',
        EventName: '',
        EventParticipants: '',
        EventPicture: '',
        EventStart: '',
        GroupID: ''
    })
    const [ managedGroups, setManagedGroups ] = useState([]);
    const [ joinedGroups, setJoinedGroups ] = useState([]);
    const [ popularGroups, setPopularGroups ] = useState([]);
    const [ searchedGroups, setSearchedGroups ] = useState([]);
    const [ ifMemberOfCurrentGroup, setIfMemberOfCurrentGroup ] = useState(false);
    const [ ifManagerOfGroup, setIfManager ] = useState(false);
    const [ usersGroups, setUsersGroups ] = useState([]);
    const [ ifAttending, setIfAttending ] = useState('');

    const [ createdEvents, setCreatedEvents ] = useState([]);
    const [ attendingEvents, setAttendingEvents ] = useState([]);
    const [ allUserEvents, setAllUserEvents ] = useState([]);
    const [ searchedEvents, setSearchedEvents ] = useState([]);

    const [ currentGroupsEvents, setCurrentGroupsEvents ] = useState([]);

    const [ groupCategory, setGroupCategory ] = useState([
        {
            title: 'Sports',
            data: [
                {
                    Ref: 'Tennis',
                    URL: 'https://imageio.forbes.com/specials-images/imageserve/61290485e59b1a3c399d34e7/0x0.jpg?format=jpg&crop=2699,1519,x0,y0,safe&width=1200'
                },
                {
                    Ref: 'Football',
                    URL: 'https://thephysiocompany.co.uk/wp-content/uploads/football.jpg'
                },
                {
                    Ref: 'Badminton',
                    URL: 'https://www.completesports.com/wp-content/uploads/Badminton.jpg'
                },
                {
                    Ref: 'Swimming',
                    URL: 'https://www.shape.com/thmb/y7XHTgiQzL_gLqtB7AVR1LBYZHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/swimming-workouts-for-women-d137e32a8fcf4d68bf4713ce2c628a07.jpg'
                },
                {
                    Ref: 'Hiking',
                    URL: 'https://ychef.files.bbci.co.uk/976x549/p09clnrw.jpg'
                },
                {
                    Ref: 'Boxing',
                    URL: 'https://live.staticflickr.com/8461/27841253683_ef193afac4_b.jpg'
                },
                {
                    Ref: 'Running',
                    URL: 'https://health.clevelandclinic.org/wp-content/uploads/sites/3/2020/07/fasterRunner-656983165-770x533-1.jpg'
                },
                {
                    Ref: 'Rugby',
                    URL: 'https://cdn.britannica.com/16/173116-050-3E75FA65/Billy-Slater-try-Australia-final-Rugby-League-Nov-30-2013.jpg'
                },
                {
                    Ref: 'Dance',
                    URL: 'https://www.wien.info/resource/image/310848/3x2/832/561/e68435cf554394c5b726783e6007c2cc/EBB0DFCAA4C3DB06DCCAE8A83897347D/tanzquartier-wien-saison-2020-21-being-pink-ain-t-easy-by-joana-tischkau.webp'
                },
                {
                    Ref: 'Basketball',
                    URL: 'https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2022%2F1213%2Fr1106221_1296x729_16%2D9.jpg'
                }
            ]
        },
        {
            title: 'Nature',
            data: [
                {
                    Ref: 'Wildlife',
                    URL: 'https://iso.500px.com/wp-content/uploads/2016/03/stock-photo-142984111.jpg'
                },
                {
                    Ref: 'DogWalking',
                    URL: 'https://animalcoursesdirect.co.uk/ckfinder/userfiles/images/Dog-Walker-blog-img2.jpg'
                },
                {
                    Ref: 'Indoor Plants',
                    URL: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/house-plants-1629187361.jpg?crop=0.288xw:0.577xh;0.0465xw,0.205xh&resize=640:*'
                },
                {
                    Ref: 'BirdSpotting',
                    URL: 'https://i0.wp.com/stonescottages.co.uk/wp-content/uploads/2016/09/IMG_5842a-Wheatear-LLandruidion.jpg?w=778&h=515&ssl=1'
                },
                {
                    Ref: 'Mountains',
                    URL: 'https://cdn.britannica.com/67/19367-050-885866B4/Valley-Taurus-Mountains-Turkey.jpg'
                },
                {
                    Ref: 'Woodlands',
                    URL: 'https://www.forestryengland.uk/sites/default/files/styles/list_image_large_2x/public/media/Isobel%20Cameron.jpg?h=5d54d89a&itok=Fj1Xarow'
                },
                {
                    Ref: 'Beach',
                    URL: 'https://hips.hearstapps.com/hmg-prod/images/champagne-beach-espiritu-santo-island-vanuatu-royalty-free-image-1655672510.jpg?crop=1.00xw:0.755xh;0,0.173xh&resize=1200:*'
                },
                {
                    Ref: 'Gardening',
                    URL: 'https://ca-times.brightspotcdn.com/dims4/default/c8f0d3e/2147483647/strip/true/crop/1800x1013+0+0/resize/1200x675!/quality/80/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Ff5%2F33%2F417fa05141e394041be1e7fe9813%2Fgardening-clip-art-adobe-stock.jpg'
                },
                {
                    Ref: 'Kayak',
                    URL: 'https://hobbycents.com/wp-content/uploads/2022/04/Top-Rated-Hobbies-for-Nature-Lovers-Kayaking.jpg'
                },
                {
                    Ref: 'Hills',
                    URL: 'https://www.electricireland.com/images/folder/ni-business/hiking.jpg?sfvrsn=2e91b30d_2'
                }
            ]
        },
        {
            title: 'Gaming',
            data: [
                {
                    Ref: 'Pacmna',
                    URL: 'https://img.redbull.com/images/c_fill,w_1200,h_630,g_auto,f_auto,q_auto/redbullcom/2013/12/03/1331622889292_3/pac-man-gaming'
                },
                {
                    Ref: 'PC',
                    URL: 'https://specials-images.forbesimg.com/imageserve/62b4570b678d2aa35f4a638c/Corsair-Vengeance-i7300-gaming-PC-in-a-bedroom-/960x0.jpg?cropX1=138&cropX2=1065&cropY1=0&cropY2=618'
                },
                {
                    Ref: 'Sim',
                    URL: 'https://www.d-box.com/hubfs/D-BOX%20Sim%20Racing%20rig%20with%20G5%20actuators.jpg'
                },
                {
                    Ref: 'Monoplay',
                    URL: 'https://media.timeout.com/images/105627949/image.jpg'
                },
                {
                    Ref: 'DandD',
                    URL: 'https://media.wired.com/photos/6164add283b0adfec5fa86bd/master/w_2560%2Cc_limit/2AKH23P.jpg'
                },
                {
                    Ref: 'Forenite',
                    URL: 'https://media.wired.com/photos/5b47d36c40e30c2ec0dcc949/master/pass/fortnite.jpg'
                },
                {
                    Ref: 'Vintage',
                    URL: 'https://www.themanual.com/wp-content/uploads/sites/9/2019/01/retro-video-game-consoles.jpg?p=1'
                },
                {
                    Ref: 'Arcade',
                    URL: 'https://wealthofgeeks.com/wp-content/uploads/2021/10/the-best-arcade-games.png'
                },
                {
                    Ref: 'Pinball',
                    URL: 'https://cdn.vox-cdn.com/thumbor/TSy8cw4GE-A2IWPfjBx803EO6k4=/0x0:3000x2000/1400x933/filters:focal(1260x760:1740x1240):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/69793085/sophie_hurwitz_210827_ecl_pinball_0007.0.jpg'
                },
                {
                    Ref: 'Warhammer',
                    URL: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12182/production/_116441147_fw-thousand-sons-v-space-wolves-game-in-progress.jpg'
                }
            ]
        },
        {
            title: 'Travel',
            data: [
                {
                    Ref: 'Airport',
                    URL: 'https://wttc.org/DesktopModules/MVC/NewsArticleList/images/141_20201013185512_Consumer%20Survey%20Finds%2070%20Percent%20of%20Travelers%20Plan%20to%20Holiday%20in%202021.jpg'
                },
                {
                    Ref: 'Trains',
                    URL: 'https://merriam-webster.com/assets/mw/images/article/art-wap-landing-mp-lg/train-3448-72edc8c66df509608c1e13f712a1436e@1x.jpg'
                },
                {
                    Ref: 'Sea',
                    URL: 'https://res.cloudinary.com/gwatco/image/upload/dpr_auto/t_image-card/f_auto/v1676620800/new-website/static/homepage/global-travel-cover/banner.webp'
                },
                {
                    Ref: 'Camel',
                    URL: 'https://www.blueskygroup.net/images/img/Egypt-Cairo-Camel-and-Egyptian-Man-Step-Pyramid.jpg'
                },
                {
                    Ref: 'Hammock',
                    URL: 'https://www.sntravel.co.uk/wp-content/uploads/2018/06/Caribbean-hammock-beach-1024x683.jpg'
                },
                {
                    Ref: 'Italy',
                    URL: 'https://cdn.cnn.com/cnnnext/dam/assets/170606121206-italy---travel-destination---shutterstock-517522957-super-tease.jpg'
                },
                {
                    Ref: 'Japan',
                    URL: 'https://static.independent.co.uk/2022/08/24/12/iStock-1146262403.jpg?quality=75&width=1200&auto=webp'
                },
                {
                    Ref: 'France',
                    URL: 'https://imageio.forbes.com/specials-images/imageserve/62f2863deb9b0c0cd1fe6374/fall-travel-cheaper/0x0.jpg?format=jpg&width=960'
                },
                {
                    Ref: 'Family',
                    URL: 'https://www.visa.co.uk/dam/VCOM/regional/ve/croratia/in-page-images/travel/easy-800x450.jpg'
                },
                {
                    Ref: 'Sand',
                    URL: 'https://www.southdownsinsurance.co.uk/App_Themes/Travel/resources/css/images/background/Travel-Insurance-Southdowns.jpg'
                }
            ]
        },
        {
            title: 'Food',
            data: [
                {
                    Ref: 'Ramen',
                    URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd5JQUaTkeJvFmPy48OxwlSp6wgVC_ICIPyg&usqp=CAU'
                },
                {
                    Ref: 'Italian',
                    URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU3aFFrGjHzgGlEwGBQ25SDd0kjlBwHRqZ4Q&usqp=CAU'
                },
                {
                    Ref: 'Pasta',
                    URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQExqS9SOxlSlEAPa5zb4AYm90NyvpaxFuuxw&usqp=CAU'
                },
                {
                    Ref: 'Sandwich',
                    URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoICFmDhsl7bbtj6ShJHvgOEptCBjoHoAczw&usqp=CAU'
                },
                {
                    Ref: 'Sauce',
                    URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs5HxVAp1i4gIRYlaBTwNmWuCME_mnQo1s6w&usqp=CAU'
                },
                {
                    Ref: 'Baking',
                    URL: 'https://images.lifestyleasia.com/wp-content/uploads/sites/2/2022/11/23125003/baking-recipes-1600x900.jpeg'
                },
                {
                    Ref: 'Cooking',
                    URL: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422.jpg'
                },
                {
                    Ref: 'Seasoning',
                    URL: 'https://cdn.shopify.com/s/files/1/0445/1365/6985/files/how-to-season-meat.jpg?v=1638211344'
                },
                {
                    Ref: 'Fish',
                    URL: 'https://images.ctfassets.net/3s5io6mnxfqz/40HHQNPkvvCrAdooePiYHk/58cc774cc9baaeef30d9aaeb7554c9dd/AdobeStock_120358487.jpeg'
                },
                {
                    Ref: 'Sweets',
                    URL: 'https://cdn.shopify.com/s/files/1/0634/5592/0349/products/5_18130f5e-468b-420f-af18-c912c8588328.png?v=1665998094'
                }
            ]
        },
        {
            title: 'Collecting',
            data: [
                {
                    Ref: 'Stamps',
                    URL: 'https://assets-thehuntmagazine-com.s3-accelerate.amazonaws.com/2020/06/delaware-stamp-and-coin-collecting.jpeg'
                },
                {
                    Ref: 'Cars',
                    URL: 'https://classicandsportscar.com/sites/default/files/styles/article_inline_single/public/2018-09/Classic_Sports_Car_Buckley_Collecting_14_0.png?itok=EwUQvvsN'
                },
                {
                    Ref: 'Antique',
                    URL: 'https://cf.ltkcdn.net/antiques/images/orig/270775-1600x1066-collecting-antiques-practical-guide-beginners.jpg'
                },
                {
                    Ref: 'Thrifting',
                    URL: 'https://www.highsnobiety.com/static-assets/thumbor/fL8IIqstKiZRRdXD_s-E1AO3zhA=/1600x1067/www.highsnobiety.com/static-assets/wp-content/uploads/2019/12/13124156/vintage-clothes-thrift-shopping-main.jpg'
                },
                {
                    Ref: 'Cameras',
                    URL: 'https://www.dpreview.com/files/p/articles/1120365687/First-film-camera6.jpeg'
                },
                {
                    Ref: 'Match',
                    URL: 'https://i.pinimg.com/originals/e9/67/dd/e967ddad5a80d1ace3ce18ee58eddc92.jpg'
                },
                {
                    Ref: 'Shoes',
                    URL: 'https://imageio.forbes.com/specials-images/imageserve/663601508/960x0.jpg?format=jpg&width=960'
                },
                {
                    Ref: 'Cards',
                    URL: 'https://cdn.cardcollector.co.uk/wp-content/uploads/2020/10/how-to-start-collecting-pokemon-cards.jpg'
                },
                {
                    Ref: 'Toys',
                    URL: 'https://itsastampede615821596.files.wordpress.com/2018/02/toys-1011.jpg?w=1200'
                },
                {
                    Ref: 'Bikes',
                    URL: 'https://alittlebitofstone.com/wp-content/uploads/2020/11/Vintage-Bike-Collection.jpg'
                }
            ]
        },
        {
            title: 'Music',
            data: [
                {
                    Ref: 'Hand',
                    URL: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80'
                },
                {
                    Ref: 'Rock',
                    URL: 'https://images.saymedia-content.com/.image/t_share/MTc0OTkyOTY5NjEzNDUyNzQw/100-best-dance-rock-songs.jpg'
                },
                {
                    Ref: 'Concert',
                    URL: 'https://media.istockphoto.com/id/627682404/photo/rock-concert.jpg?s=612x612&w=0&k=20&c=C3tRYlCLjgwRR8IscuM0kcDnIZb2-Q8_gkfc-T2_lfU='
                },
                {
                    Ref: 'Jams',
                    URL: 'https://1159025897.rsc.cdn77.org/data/images/full/79817/making-the-band-guitars-bass-drums-what-are-the-positions.jpg'
                },
                {
                    Ref: 'Classic',
                    URL: 'https://www.kennedy-center.org/globalassets/education/resources-for-educators/classroom-resources/artsedge/collection/collection-classical-music-169.jpg'
                },
                {
                    Ref: 'Festival',
                    URL: 'https://www.hollywoodreporter.com/wp-content/uploads/2022/03/coachella-music-festival-2019-H-MAIN-022.jpg?w=1080'
                },
                {
                    Ref: 'Studio',
                    URL: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBzdHVkaW98ZW58MHx8MHx8&w=1000&q=80'
                },
                {
                    Ref: 'Piano',
                    URL: 'https://www.uottawa.ca/research-innovation/sites/g/files/bhrskd326/files/styles/max_width_l_1470px/public/2022-02/MHRI_home-banner_16x9.jpg?itok=BHhPDZpD'
                },
                {
                    Ref: 'Gig',
                    URL: 'https://themusicessentials.com/wp-content/uploads/2016/12/drum-and-bass-nights_i4_s3.jpg'
                },
                {
                    Ref: 'Record',
                    URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvTq4TUK-StWcEme2j747tIL81asw3SUGULaVM8e9_PQTi_u9nLJIDW3_boN3QQ-nubjc&usqp=CAU'
                }
            ]
        },
        {
            title: 'Arts',
            data: [
                {
                    Ref: 'Kids',
                    URL: 'https://images.theconversation.com/files/339504/original/file-20200603-130907-asv1yo.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'
                },
                {
                    Ref: 'ArtGallery',
                    URL: 'https://d33hx0a45ryfj1.cloudfront.net/transform/238827ac-8b26-407c-bd94-8c53f2950a35/installation-view-of-mixing-it-up-painting-today-at-hayward-gallery-courtesy-of-hayward-gallery-photo-rob-harris?io=transform:fill,width:1200,height:675'
                },
                {
                    Ref: 'Brush',
                    URL: 'https://s32625.pcdn.co/wp-content/uploads/2018/07/steve-johnson-592593-unsplash-1024x682.jpg.optimal.jpg'
                },
                {
                    Ref: 'Pottery',
                    URL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMxIKObjr1wxOTAcWAETvNWoCaiikFxfY8XQ&usqp=CAU'
                },
                {
                    Ref: 'Clay',
                    URL: 'https://ichef.bbci.co.uk/images/ic/320xn/p05j4bf9.jpg'
                },
                {
                    Ref: 'Jewellery',
                    URL: 'https://media.timeout.com/images/103706501/image.jpg'
                },
                {
                    Ref: 'Tattoos',
                    URL: 'https://inkppl.com//assets/php/files/052022/160522-1532-3724.jpg'
                },
                {
                    Ref: 'Portraits',
                    URL: 'https://www.pencilportraitartist.co.uk/wp-content/uploads/2020/10/Meg-finished-7.jpg'
                },
                {
                    Ref: 'Photography',
                    URL: 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/07/social-media-for-photographers-follow-1.jpg'
                },
                {
                    Ref: 'Sewing',
                    URL: 'https://lisafalconer.files.wordpress.com/2020/11/1200x628-featured-image-on-wordpress.png'
                }
            ]
        }
    ])


    async function handleCreateGroup(picture, description, name, email, navigation){
        let groupID;
        groupID = addDoc(collection(db, 'Groups'),
        {
            GroupName: name,
            GroupDescription: description,
            GroupPicture: picture,
            GroupMembers: 1
        })
        .then((docRef) => {
            addDoc(collection(db, 'GroupMembers'),
            {
                GroupID: docRef.id,
                MemberType: 'Admin',
                UserID: email
            })
            .then(
                setManagedGroups([
                    ...managedGroups,
                    {
                        GroupID: docRef.id,
                        GroupName: name,
                        GroupDescription: description,
                        GroupPicture: picture,
                        GroupMembers: 1
                    }
                ]),
                navigation.pop(),
                console.log(docRef.id),
                navigation.navigate('GroupPage', {groupID: docRef.id})

            )
        })
    };
    // async function handleCreateGroup(picture, desciption, name, email, navigation){
        
    //     const randomRef = uuid.v4();
    //     let groupID;
    //     alert(randomRef);
    //     const storageRef = ref(storage, '/groupImages/'+randomRef+'.jpeg');
    //     await fetch(picture)
    //         .then(response => response.blob())
    //         .then(blob => {
    //             uploadBytesResumable(storageRef, new File([blob], {type: 'image/jpeg'}))
    //             .then((snap) => {
    //                 getDownloadURL(snap.ref)
    //                 .then((url) => {
    //                     groupID = addDoc(collection(db, 'Groups'),
    //                     {
    //                         GroupName: name,
    //                         GroupDescription: desciption,
    //                         GroupPicture: url,
    //                         GroupMembers: 1
    //                     })
    //                     .then((docRef)=>{
    //                         addDoc(collection(db, 'GroupMembers'),
    //                         {
    //                             GroupID: docRef.id,
    //                             MemberType: 'Admin',
    //                             UserID: email
    //                         })
    //                         .then(
    //                             setManagedGroups([
    //                                 ...managedGroups,
    //                                 {
    //                                     GroupID: docRef.id
    //                                 }
    //                             ]),
    //                             navigation.pop(),     
    //                             console.log(docRef.id),
    //                             navigation.navigate('GroupPage', {groupID: docRef.id})
    //                         )
    //                     })
    //                 })
                    
    //             })
    //         })
    // };

    async function handleFetchUsersGroups(email){
        async function getGroupData(groupid) {
            const group = doc(db, "Groups", groupid);
            const snap = await getDoc(group);
            const data = snap.data();
            console.log('wooo  '+data.GroupDescription);
            const groupData = {
                GroupDescription: data.GroupDescription,
                GroupMembers: data.GroupMembers,
                GroupName: data.GroupName,
                GroupPicture: data.GroupPicture,
                GroupID: groupid
            }
            return groupData;
        }
        async function wipe() {
            setManagedGroups([]);
            setJoinedGroups([]);
            return 1
        }
        const q = query(collection(db, "GroupMembers"), where("UserID", "==", email));
        const querySnap = await getDocs(q);
        const wipeout = await wipe();
        querySnap.forEach( async(doc) => {
            if (doc.data().MemberType === "Admin") {
                const group = await getGroupData(doc.data().GroupID);
                console.log("group " + group.GroupName);
                setManagedGroups((prevManagedGroups) => [
                  ...prevManagedGroups,
                  {
                    GroupName: group.GroupName,
                    GroupPicture: group.GroupPicture,
                    GroupID: group.GroupID
                  },
                ]);
            } 
            else if (doc.data().MemberType === 'Member'){
                const group = await getGroupData(doc.data().GroupID);
                console.log("group " + group.GroupName);
                setJoinedGroups((prevJoinedGroups) => [
                  ...prevJoinedGroups,
                  {
                    GroupName: group.GroupName,
                    GroupPicture: group.GroupPicture,
                    GroupID: group.GroupID
                  },
                ]);
            }
        });
    };

    async function handleFetchPopularGroups(){
        setPopularGroups([]);
        const q = query(collection(db, "Groups"), orderBy("GroupMembers"), limit(10));
        const querySnap = await getDocs(q);  
        const groups = [];
        querySnap.forEach((doc) => {
            console.log('group id is '+doc.id);
          groups.push({
            GroupID: doc.id,
            GroupDescription: doc.data().GroupDescription,
            GroupMembers: doc.data().GroupMembers,
            GroupName: doc.data().GroupName,
            GroupPicture: doc.data().GroupPicture
          });
        });        
        setPopularGroups(groups);
    };

    async function handleFetchGroupData(groupid){
            const group = doc(db, "Groups", groupid);
            const snap = await getDoc(group);
            const data = snap.data();
            console.log('wooo  '+data.GroupDescription);
            const groupData = {
                GroupDescription: data.GroupDescription,
                GroupMembers: data.GroupMembers,
                GroupName: data.GroupName,
                GroupPicture: data.GroupPicture,
                GroupID: groupid
            }
            setCurrentGroup(groupData);   
    }

    async function handleCheckIfMember(groupid){
        let member = false;
        managedGroups.forEach((group) =>{
            if(group.GroupID === groupid){
                member = true;
            }
        })
        joinedGroups.forEach((group) => {
            if(group.GroupID === groupid){
                member = true;
            }
        })
        return member
    }

    async function handleCheckIfJoinedMember(groupid){
        let member = false;
        joinedGroups.forEach((group) => {
            if(group.GroupID === groupid){
                console.log('User is a member (GroupContext call)')
                member = true;
            }
        })
        setIfMemberOfCurrentGroup(member);
        return member;
    }

    async function handleCheckIfManagedMember(groupid){
        let member = false;
        managedGroups.forEach((group) => {
            if(group.GroupID === groupid){
                member = true;
            }
        })
        setIfManager(member);
    }

    async function handleFetchGroupsBySearch(searchText){
        setSearchedGroups([]);
        const q = query(collection(db, "Groups"));
        const querySnap = await getDocs(q);  
        const groups = [];
        querySnap.forEach((doc) => {
            if((doc.data().GroupName.toLowerCase()).includes(searchText.toLowerCase()))
            {
                groups.push({
                    GroupID: doc.id,
                    GroupDescription: doc.data().GroupDescription,
                    GroupMembers: doc.data().GroupMembers,
                    GroupName: doc.data().GroupName,
                    GroupPicture: doc.data().GroupPicture
                  });
            }
        });        
        setSearchedGroups(groups);
    }

    async function handleAddMemberToGroup(groupID, email, navigation, name, description, picture, members){
        //Add user to groupmembers 
        addDoc(collection(db, 'GroupMembers'),
        {
            GroupID: groupID,
            MemberType: 'Member',
            UserID: email
        })
        .then(async() => {
            const groupRef = doc(db, "Groups", groupID);
            const res = await updateDoc(groupRef, {
                GroupMembers: increment(1)
            })
            setJoinedGroups([
                ...joinedGroups,
                {
                    GroupID: groupID,
                    GroupName: name,
                    GroupDescription: description,
                    GroupPicture: picture,
                    GroupMembers: members
                }
            ])
            handleFetchAllEvents(email)
            navigation.pop(),
            navigation.navigate('GroupPage', {groupID: groupID})
        })
    }

    async function handleRemoveMemberFromGroup(groupID, email, navigation)
    {
        console.log(groupID, email)
        const q = query(collection(db, "GroupMembers"), where("UserID", "==", email), where("GroupID", "==", groupID), limit(1));
        const querySnap = await getDocs(q);
        querySnap.forEach((group) => {
            console.log(group.ref)
            deleteDoc(group.ref)
            .then(async() => {
                const groupRef = doc(db, "Groups", groupID);
                const res = await updateDoc(groupRef, {
                GroupMembers: increment(-1)  
                })
                .then(() => {
                    handleFetchAllEvents(email);
                    setJoinedGroups(joinedGroups.filter(group => group.GroupID != groupID))
                    navigation.pop()
                }) 
            })
        });  
    }

    async function handleEditGroup(groupID, groupPicture, groupDescription, groupName, navigation, email){
        console.log('ID '+groupID)
        const groupRef = doc(db, "Groups", groupID);
        const res = await updateDoc(groupRef, {
            GroupPicture: groupPicture,
            GroupDescription: groupDescription,
            GroupName: groupName
        })
        handleFetchGroupData(groupID)
        handleFetchPopularGroups()
        handleFetchUsersGroups(email)
        navigation.pop()
    }

    async function handleFetchGroups(user){
        async function getGroupData(groupid) {
            const group = doc(db, "Groups", groupid);
            const snap = await getDoc(group);
            const data = snap.data();
            console.log('wooo  '+data.GroupDescription);
            const groupData = {
                GroupDescription: data.GroupDescription,
                GroupMembers: data.GroupMembers,
                GroupName: data.GroupName,
                GroupPicture: data.GroupPicture,
                GroupID: groupid
            }
            return groupData;
        }
        setUsersGroups([]);
        const q = query(collection(db,'GroupMembers'), where('UserID', '==', user.user.email));
        const querySnap = await getDocs(q);
        querySnap.forEach( async(doc) => {
            const group = await getGroupData(doc.data().GroupID)
            setUsersGroups((prevGroups) => [
                ...prevGroups,
                {
                    label: group.GroupName,
                    value: group.GroupID,
                    GroupPicture: group.GroupPicture,
                    GroupName: group.GroupName
                }
            ])
        })

    }

    async function handleCreateEvent(navigation, email, groupID, eventPic, eventName, eventLocation, eventStart, eventEnd, eventDetails, eventLimit)
    {
        let eventID;
        eventID = addDoc(collection(db, 'Events'),
        {
            EventName: eventName,
            EventPicture: eventPic,
            EventLocation: eventLocation,
            GroupID: groupID,
            EventStart: eventStart,
            EventEnd: eventEnd,
            EventDetails: eventDetails,
            EventLimit: eventLimit,
            EventParticipants: 1,
            EventCreater: email
        })
        .then((docRef) => {
            addDoc(collection(db, 'EventMembers'),
            {
                EventID: docRef.id,
                GroupID: groupID,
                MemberType: 'Admin',
                UserID: email
            })
            async function getGroupData(groupid) {
                const group = doc(db, "Groups", groupid);
                const snap = await getDoc(group);
                const data = snap.data();
                console.log('wooo  '+data.GroupDescription);
                const groupData = {
                    GroupName: data.GroupName,
                }
                return groupData;
            }
            const group = getGroupData(groupID)
            setCreatedEvents((prevEvents) => [
                ...prevEvents,
                {
                    EventID: docRef.id,
                    EventName: eventName,
                    EventPicture: eventPic,
                    GroupID: groupID,
                    GroupName: group.GroupName,
                    EventStart: eventStart,
                    EventParticipants: 1,
                    EventLocation: eventLocation, 
                    EventCreater: email
                }
            ])
            setAllUserEvents((prevEvents) => [
                ...prevEvents,
                {
                    EventID: docRef.id,
                    EventName: eventName,
                    EventPicture: eventPic,
                    GroupID: groupID,
                    GroupName: group.GroupName,
                    EventStart: eventStart,
                    EventParticipants: 1,
                    EventLocation: eventLocation, 
                    EventCreater: email
                }
            ])
            navigation.pop(),
            navigation.navigate('EventPage', {eventID: docRef.id, groupID: groupID})
        })
        
    }

    async function handleFetchEventData(eventid){
        const event = doc(db, "Events", eventid);
        const snap = await getDoc(event);
        setCurrentEvent({
            EventID: eventid,
            EventDetails: snap.data().EventDetails,
            EventEnd: snap.data().EventEnd,
            EventLimit: snap.data().EventLimit,
            EventLocation: snap.data().EventLocation,
            EventName: snap.data().EventName,
            EventParticipants: snap.data().EventParticipants,
            EventPicture: snap.data().EventPicture,
            EventStart: snap.data().EventStart,
            GroupID: snap.data().GroupID,
            EventCreater: snap.data().EventCreater
        })
    }

    async function handleFetchAllCreatedEventsAndAttending(useremail){
        async function getEventData(eventid) {
            const event = doc(db, "Events", eventid);
            const snap = await getDoc(event);
            const data = snap.data();
            console.log('wooo  '+data.EventName);
            const eventData = {
                EventID: eventid,
                EventDetails: data.EventDetails,
                EventEnd: data.EventEnd,
                EventLimit: data.EventLimit,
                EventLocation: data.EventLocation,
                EventName: data.EventName,
                EventParticipants: data.EventParticipants,
                EventPicture: data.EventPicture,
                EventStart: data.EventStart,
                GroupID: data.GroupID,
                EventCreater: data.EventCreater
            }
            return eventData;
        }
         async function getGroupData(groupid) {
            const group = doc(db, "Groups", groupid);
            const snap = await getDoc(group);
            const data = snap.data();
            console.log('wooo  '+data.GroupDescription);
            const groupData = {
                GroupDescription: data.GroupDescription,
                GroupMembers: data.GroupMembers,
                GroupName: data.GroupName,
                GroupPicture: data.GroupPicture,
                GroupID: groupid
            }
            return groupData;
        }
        setCreatedEvents([]);
        setAttendingEvents([]);
        const q = query(collection(db, 'EventMembers'), where('UserID', '==', useremail));
        const querysnap = await getDocs(q);
        querysnap.forEach( async(doc) => {
            const event = await getEventData(doc.data().EventID)
            const group = await getGroupData(doc.data().GroupID)
            console.log(doc.data())
            if(doc.data().MemberType==='Admin'){
                setCreatedEvents((prevEvents) => [
                    ...prevEvents,
                    {
                        EventID: event.EventID,
                        EventName: event.EventName,
                        EventPicture: event.EventPicture,
                        GroupID: event.GroupID,
                        GroupName: group.GroupName,
                        EventStart: event.EventStart,
                        EventParticipants: event.EventParticipants,
                        EventLocation: event.EventLocation,
                        EventCreater: event.EventCreater
                    }
                ])
            }
            else if(doc.data().MemberType==='Member'){
                setAttendingEvents((prevEvents) => [
                    ...prevEvents,
                    {
                        EventID: event.EventID,
                        EventName: event.EventName,
                        EventPicture: event.EventPicture,
                        GroupID: event.GroupID,
                        GroupName: group.GroupName,
                        EventStart: event.EventStart,
                        EventParticipants: event.EventParticipants,
                        EventLocation: event.EventLocation,
                        EventCreater: event.EventCreater
                    }
                ])
            }
        })
        console.log(createdEvents.length+' events: '+createdEvents)
    }

    async function handleFetchAllEvents(email){
        const groups = [];
        setUsersGroups([]);
        // 1 request - Get all Groups with their data
        const groupQuery = query(collection(db, 'Groups'));
        const groupQuerysnap = await getDocs(groupQuery);
        //1 request - Get all Users Group ID's from GroupMember collection
        const q = query(collection(db, 'GroupMembers'), where('UserID', '==', email));
        const querysnap = await getDocs(q);
        querysnap.forEach( async(doc) => {
            groupQuerysnap.forEach((group) => {
                if(group.id === doc.data().GroupID)
                {
                    console.log('added '+group.data().GroupName);
                    groups.push({
                        GroupID: group.id,
                        GroupMemberType: doc.data().MemberType,
                        GroupDescription: group.data().GroupDescription,
                        GroupMembers: group.data().GroupMembers,
                        GroupName: group.data().GroupName,
                        GroupPicture: group.data().GroupPicture
                    })
                    
                }
            })
            
        })
        //1 request - Get all Events where GroupID matches
         setAllUserEvents([]);
         const events = [];
         const eventQuery = query(collection(db, 'Events'));
         const eventQuerySnap = await getDocs(eventQuery);
         eventQuerySnap.forEach((event) =>{
             groups.forEach((group) => {
                 if(event.data().GroupID === group.GroupID)
                 {
                     console.log('yes there is an event '+event.data().EventName)
                     events.push({
                         GroupID: group.GroupID,
                         EventName: event.data().EventName,
                         EventCreater: event.data().EventCreater,
                         EventDetails: event.data().EventDetails,
                         EventEnd: event.data().EventEnd,
                         EventPicture: event.data().EventPicture,
                         EventLocation: event.data().EventLocation, 
                         EventStart: event.data().EventStart,
                         GroupName: group.GroupName,
                         EventID: event.id
                     })
                 }
             })
         })
         setAllUserEvents(events);
         //1 request - All EventMember columns where user matches
         const attending = [];
         const creating = [];
         const eventMemberQuery = query(collection(db, 'EventMembers'), where('UserID', '==', email));
         const eventMemberQuerySnap = await getDocs(eventMemberQuery);
         eventMemberQuerySnap.forEach((eventMember) => {
             events.forEach((event) => {
                 if(event.EventID === eventMember.data().EventID)
                 {
                    if(eventMember.data().MemberType==='Admin'){
                        creating.push({
                         GroupID: event.GroupID,
                         EventName: event.EventName,
                         EventCreater: event.EventCreater,
                         EventDetails: event.EventDetails,
                         EventEnd: event.EventEnd,
                         EventPicture: event.EventPicture,
                         EventLocation: event.EventLocation, 
                         EventStart: event.EventStart,
                         GroupName: event.GroupName,
                         EventID: event.EventID
                        })
                    }
                    else if(eventMember.data().MemberType==='Member')
                    {
                        console.log('attending '+event.GroupName)
                        attending.push({
                         GroupID: event.GroupID,
                         EventName: event.EventName,
                         EventCreater: event.EventCreater,
                         EventDetails: event.EventDetails,
                         EventEnd: event.EventEnd,
                         EventPicture: event.EventPicture,
                         EventLocation: event.EventLocation, 
                         EventStart: event.EventStart,
                         GroupName: event.GroupName,
                         EventID: event.EventID
                        })
                    }
                 }
             })
         })
         setAttendingEvents(attending);
         setCreatedEvents(creating);
    }

    async function handleCheckIfAttending(eventid, email){
        let result = false;
        const eventMemberQuery = query(collection(db, 'EventMembers'), where('UserID', '==', email), where('EventID', '==', eventid));
        const eventMemberQuerySnap = await getDocs(eventMemberQuery)
        eventMemberQuerySnap.forEach((member) => {
            console.log(member.data().MemberType)
            if(member.data().MemberType==='Member'){
                result = 'attending'
            }
            else if(member.data().MemberType==='Admin')
            {
                result = 'created'
            }
        })
        setIfAttending(result);
        console.log('member '+result)
    }

    async function handleEditEvent(eventID, eventPic, eventName, eventLocation, eventStart, eventEnd, eventDetails, eventCapacity, email, navigation){
        console.log('ID'+eventID)
        const eventRef = doc(db, 'Events', eventID);
        const res = await updateDoc(eventRef, {
            EventDetails: eventDetails,
            EventEnd: eventEnd,
            EventLimit: eventCapacity,
            EventLocation: eventLocation,
            EventName: eventName,
            EventPicture: eventPic,
            EventStart: eventStart
        })
        handleFetchEventData(eventID);
        navigation.pop()
        handleFetchAllEvents(email)
    }

    async function handleAddMemberToEvent(eventID, email, navigation, groupID, GroupName){
        addDoc(collection(db, 'EventMembers'),
        {
            EventID: eventID,
            GroupID: groupID,
            MemberType: 'Member',
            UserID: email
        })
        .then(async() => {
            const eventRef = doc(db, 'Events', eventID);
            const red = await updateDoc(eventRef, {
                EventParticipants: increment(1)
            })
            const event = await getDoc(eventRef);
            setAttendingEvents([
                ...attendingEvents,
                {
                    GroupID: event.data().GroupID,
                    EventName: event.data().EventName,
                    EventCreater: event.data().EventCreater,
                    EventDetails: event.data().EventDetails,
                    EventEnd: event.data().EventEnd,
                    EventPicture: event.data().EventPicture,
                    EventLocation: event.data().EventLocation, 
                    EventStart: event.data().EventStart,
                    GroupName: GroupName,
                    EventID: event.data().EventID
                }
            ])
            navigation.replace('EventPage',{eventID, groupID})
        })
    }

    async function handleRemoveMemberFromEvent(eventID, email, navigation, groupID){
        console.log('LEAVE GROUP');
        const q = query(collection(db, 'EventMembers'), where('UserID', '==', email), where('EventID', '==', eventID), limit(1));
        const querySnap = await getDocs(q);
        querySnap.forEach((member) => {
            deleteDoc(member.ref)
            .then(async() => {
                const eventRef = doc(db, 'Events', eventID);
                const res = await updateDoc(eventRef, {
                    EventParticipants: increment(-1)
                })
                .then(()=> {
                    handleFetchAllEvents(email)
                    navigation.pop()
                })
            })
        })
    }

    async function handleFetchEventsBySearch(searchText){
        setSearchedEvents([]);
        const results = [];
        allUserEvents.forEach((event) => {
            console.log(event.EventName.toLowerCase())
            console.log(searchText.toLowerCase())
            if((event.EventName.toLowerCase()).includes(searchText.toLowerCase())){
                console.log('woooo')
                results.push({
                    GroupID: event.GroupID,
                    EventName: event.EventName,
                    EventCreater: event.EventCreater,
                    EventDetails: event.EventDetails,
                    EventEnd: event.EventEnd,
                    EventPicture: event.EventPicture,
                    EventLocation: event.EventLocation, 
                    EventStart: event.EventStart,
                    GroupName: event.GroupName,
                    EventID: event.EventID
                })
            }
        })
        console.log(results.length);
        setSearchedEvents(results);
    }

    async function handleFetchGroupsEvents(groupID){
        const groups = [];
        const queryForGroups = query(collection(db, 'Groups'))
        const groupquerysnap = await getDocs(queryForGroups);
        groupquerysnap.forEach((group) => {
            groups.push({
                GroupID: group.id,
                GroupName: group.data().GroupName
            })
        })
        const events = [];
        const q = query(collection(db, 'Events'), where('GroupID', '==', groupID), limit(2));
        const querySnap = await getDocs(q);
        querySnap.forEach((event) =>{
            groups.forEach((group) => {
                if(groupID == group.GroupID){
                    console.log('Event '+event.data().EventName);
                    events.push({
                        EventPicture: event.data().EventPicture,
                        EventName: event.data().EventName,
                        EventLocation: event.data().EventLocation,
                        EventStart: event.data().EventStart,
                        GroupName: group.GroupName,
                        EventID: event.id,
                        GroupID: group.GroupID
                    })
                }
            })
        })
        setCurrentGroupsEvents(events); 
    }


 

    return (
        <GroupContext.Provider
            value={{
                handleCreateGroup,
                handleFetchGroupData,
                currentGroup,
                handleFetchUsersGroups,
                handleFetchPopularGroups,
                managedGroups,
                joinedGroups,
                popularGroups,
                setJoinedGroups,
                setManagedGroups,
                handleCheckIfMember,
                groupCategory,
                handleAddMemberToGroup,
                handleFetchGroupsBySearch,
                searchedGroups,
                handleCheckIfJoinedMember,
                ifMemberOfCurrentGroup,
                handleRemoveMemberFromGroup,
                handleCheckIfManagedMember,
                ifManagerOfGroup,
                handleEditGroup,
                handleFetchGroups,
                usersGroups,
                handleCreateEvent,
                handleFetchEventData,
                currentEvent,
                handleFetchAllCreatedEventsAndAttending,
                createdEvents,
                attendingEvents,
                allUserEvents,
                handleFetchAllEvents,
                handleCheckIfAttending,
                ifAttending,
                handleEditEvent,
                handleAddMemberToEvent,
                handleRemoveMemberFromEvent,
                handleFetchEventsBySearch,
                searchedEvents,
                handleFetchGroupsEvents,
                currentGroupsEvents
            }}
        >
            {children}
        </GroupContext.Provider>
    );
}

export default GroupContext;