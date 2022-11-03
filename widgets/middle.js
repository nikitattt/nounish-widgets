/*
 * Created by: ng
 * Twitter: @iamng_eth
 *
 * Version: 0.1.0
 * Last Update: 03.11.2022
 *
 * Enjoy!
 */

const white = new Color('#FFFFFF')
const black = new Color('#000000')
const purple = new Color('#8A2BE2')
const purpleSemiTransparent = new Color('#8A2BE2', 0.25)
const green = new Color('#50BA9A')
const greenSemiTransparent = new Color('#50BA9A', 0.4)
const greyOne = new Color('#BBBBBB')
const greyTwo = new Color('#666666')
const borderLight = new Color('#000000', 0.14)

const coolBackground = new Color('#d5d7e0')
const coolBorder = new Color('#bcc0d0')
const coolDarkText = new Color('#151c3b')
const coolLightText = new Color('#79809c')
const coolAccent = new Color('#e9ebf3')

const warmBackground = new Color('#e2d7d5')
const warmBorder = new Color('#d3bcb9')
const warmDarkText = new Color('#221b1a')
const warmLightText = new Color('#8f7e7c')
const warmAccent = new Color('#f9f1f1')

const widgetUrl = 'https://nouns.wtf/'

const data = await loadData()

const seed = data.auction.seed

// const communityName = data.name
// const communityAuctions = data.auctions

const w = new ListWidget()
w.backgroundColor = pickByState(coolBackground, warmBackground)
w.url = widgetUrl

const proposalsSectionTitleW = w.addStack()
proposalsSectionTitleW.centerAlignContent()

const propsSectionTitle = proposalsSectionTitleW.addText('Active Proposals')
propsSectionTitle.textColor = pickByState(coolLightText, warmLightText)
propsSectionTitle.font = Font.systemFont(12)

proposalsSectionTitleW.addSpacer(6)

proposalsSectionTitleW.addImage(createLine(600, 2, pickByState(coolBorder, warmBorder)))

w.addSpacer(4)

// const now = Date.now()
// const openAndVoting = []
// const upcoming = []

// for (const auction of communityAuctions) {
//     if (auction.status === "Open" || auction.status === "Voting") {
//         openAndVoting.push(auction)
//     } else if (auction.status === "Upcoming") {
//         upcoming.push(auction)
//     }
// }

let firstDone = false
let totalDisplayed = 0

for (const proposal of data.proposals) {
    if (totalDisplayed > 2) continue
    doSpacing()
    displayProposal(proposal)
    totalDisplayed++
}

// if (totalDisplayed <= 2) {
//     for (const auction of upcoming) {
//         if (totalDisplayed > 2) continue
//         doSpacing()
//         displayAuction(auction)
//         totalDisplayed++
//     }
// }

// if (totalDisplayed == 0) {
//     w.addSpacer(6)
//     const noRounds = w.addText('No Active or Upcoming rounds')
//     noRounds.textColor = greyOne
//     noRounds.font = Font.systemFont(12)
// }

w.addSpacer(null)

Script.setWidget(w)
Script.complete()
w.presentMedium()

/*
* Utility Functions
*/

function pickByState(cool, warm) {
    return seed.background === '0' ? cool : warm
}

function doSpacing() {
    if (!firstDone) {
        firstDone = true
        w.addSpacer(4)
    } else {
        w.addSpacer(6)
    }
}

function displayProposal(proposal) {
    let barTextColor
    let barBorderColor
    let barText
    let time
    let deadlinePrefix

    if (proposal.state === "ACTIVE") {
        barTextColor = pickByState(coolLightText, warmLightText)
        barBorderColor = pickByState(coolBorder, warmBorder)
        barText = 'Active'
        time = new Date(proposal.endTime)
        deadlinePrefix = "Ends "
    }
    // else if (auction.status === "Voting") {
    //     barTextColor = purple
    //     barBorderColor = purpleSemiTransparent
    //     barText = 'Voting'
    //     time = new Date(auction.votingEndTime)
    // } else if (auction.status === "Upcoming") {
    //     barTextColor = greyTwo
    //     barBorderColor = borderLight
    //     barText = 'Not Started'
    //     time = new Date(auction.startTime)
    // }

    //TODO: ? do not show pending props

    const deadline = getTime(time)
    const title = proposal.title

    const titleW = w.addStack()
    titleW.centerAlignContent()

    const barW = titleW.addStack()
    barW.cornerRadius = 3
    barW.borderWidth = 2
    barW.borderColor = barBorderColor
    barW.setPadding(2, 3, 2, 3)

    // const barTxt = barW.addText(barText)
    const barTxt = barW.addText(deadlinePrefix + deadline)
    barTxt.textColor = barTextColor
    barTxt.font = Font.boldSystemFont(8)

    titleW.addSpacer(4)

    const titleText = titleW.addText(title)
    titleText.textColor = pickByState(coolDarkText, warmDarkText)
    titleText.font = Font.semiboldSystemFont(12)
    titleText.lineLimit = 1

    // const infoW = w.addStack()

    // const fundingInfoText = infoW.addText('Funding ')
    // fundingInfoText.textColor = greyOne
    // fundingInfoText.font = Font.mediumSystemFont(10)

    // const fundingText = infoW.addText(funding)
    // fundingText.textColor = black
    // fundingText.font = Font.mediumSystemFont(10)

    // infoW.addSpacer(16)

    // const deadlineInfoTxt = auction.status === "Upcoming" ? 'Starts ' : 'Deadline '
    // const deadlineInfoText = infoW.addText(deadlineInfoTxt)
    // deadlineInfoText.textColor = greyOne
    // deadlineInfoText.font = Font.mediumSystemFont(10)

    // const deadlineText = infoW.addText(deadline)
    // deadlineText.textColor = black
    // deadlineText.font = Font.mediumSystemFont(10)

    // if (auction.status !== "Upcoming") {
    //     infoW.addSpacer(16)

    //     const proposalsInfoText = infoW.addText('Proposals ')
    //     proposalsInfoText.textColor = greyOne
    //     proposalsInfoText.font = Font.mediumSystemFont(10)

    //     const proposalsText = infoW.addText(`${proposals}`)
    //     proposalsText.textColor = black
    //     proposalsText.font = Font.mediumSystemFont(10)
    // }
}

async function loadImage(imageUrl) {
    const req = new Request(imageUrl)
    const image = await req.loadImage()
    return image
}

async function loadData() {
    const url = 'https://nounish-widgets-production.up.railway.app/nouns'
    const req = new Request(url)
    req.method = 'GET'
    req.headers = { 'Content-Type': 'application/json' }
    const res = await req.loadJSON()

    return res
}

function getTime(time) {
    const relativeTime = new RelativeDateTimeFormatter().string(time, new Date())

    return relativeTime
}

function createLine(width, height, color) {
    const context = new DrawContext()
    context.size = new Size(width, height)
    context.opaque = false
    context.respectScreenScale = true
    const path = new Path()
    path.addRect(new Rect(0, 0, width, height))
    context.addPath(path)
    context.setFillColor(color)
    context.fillPath()
    return context.getImage()
}
