import { applyForJob, deleteOffer, getApplicationsForOffer, getOfferById, hasUserApplied } from "../api/offers.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (isUser, isOwner, hasApplied, offer, onDelete, onApply, applications) => html`
    <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${offer.imageUrl} alt="example1" />
            <p id="details-title">${offer.title}</p>
            <p id="details-category">
                Category: <span id="categories">${offer.category}</span>
            </p>
            <p id="details-salary">
                Salary: <span id="salary-number">${offer.salary}</span>
            </p>
            <div id="info-wrapper">
                <div id="details-description">
                    <h4>Description</h4>
                    <span>${offer.description}</span>
                </div>
                <div id="details-requirements">
                    <h4>Requirements</h4>
                    <span>${offer.requirements}</span>
                </div>
            </div>
            <p>Applications: <strong id="applications">${applications}</strong></p>
    
    
            <div id="action-buttons">
                <!--Edit and Delete are only for creator-->
    
                ${buttonsTemplate(isUser, isOwner, hasApplied, offer, onDelete, onApply)}
                <!--Bonus - Only for logged-in users ( not authors )-->
                
            </div>
        </div>
    </section>`


function buttonsTemplate(isUser, isOwner, hasApplied, offer, onDelete, onApply) {
    if (isOwner) {
        return html`
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a  @click = ${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
    } else if (isUser && hasApplied == false) {
        return html`
            <a @click = ${onApply} href="javascript:void(0)" id="apply-btn">Apply</a>`
    } else {
        return null;
    }
}



export async function detailsPage(ctx) {
    
    
    const userData = await getUserData();
    const offer = await getOfferById(ctx.params.id);
    const ifApplied = userData != undefined ? await hasUserApplied(offer._id, userData.id):false;
    const applications = await getApplicationsForOffer(offer._id)

    const isUser = userData != undefined;
    const isOwner = userData?.id == offer._ownerId;
    const hasApplied = ifApplied == true;


    async function onApply(e){
        e.preventDefault();
        await applyForJob(offer._id);
        ctx.page.redirect(`/details/${offer._id}`);
    };

    async function onDelete(e){
        e.preventDefault()
        await deleteOffer(offer._id);
        ctx.page.redirect('/dashboard')
    }
    ctx.render(detailsTemplate(isUser, isOwner, hasApplied, offer, onDelete, onApply, applications))

}