import { del, get, post, put } from "./api.js";


export async function getAllOffers() {
    return get('/data/offers?sortBy=_createdOn%20desc')
}

export async function postOffer(offer) {
    return post('/data/offers', offer)
}

export async function getOfferById(offerId) {
    return get(`/data/offers/${offerId}`)
}

export async function deleteOffer(offerId) {
    return del(`/data/offers/${offerId}`)
}

export async function edditOffer(offerId, offer) {
    return put(`/data/offers/${offerId}`, offer)
}



export async function getApplicationsForOffer(offerId) {
    return get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`)
}

export async function hasUserApplied(offerId, userId) {
    return get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}

export async function applyForJob(offerId) {
    return post('/data/applications', {offerId})
}