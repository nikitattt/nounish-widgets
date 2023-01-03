/*
 * Created by: ng
 * Twitter: @iamng_eth
 *
 * Version: 0.1.0
 * Last Update: 07.11.2022
 *
 * Enjoy!
 */

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

const red = new Color('#C24949')
const redSemiTransparent = new Color('#C24949', 0.4)

const widgetUrl = 'https://nouns.wtf/vote'

const data = await loadData()

const id = data.auction.id
const bidder = data.auction.bidder
const currentBid = data.auction.currentBid
const endTime = data.auction.endTime
const image = data.auction.image
const seed = data.auction.seed

const activeProps = numOfPropsByState(data.proposals, "ACTIVE")
const pendingProps = numOfPropsByState(data.proposals, "PENDING")

const w = new ListWidget()
w.backgroundColor = pickByState(coolBackground, warmBackground)
w.url = widgetUrl

// ----- TITLE SECTION -----

const daoNameW = w.addStack()
daoNameW.centerAlignContent()

const commName = daoNameW.addText(`Nouns DAO`)
commName.textColor = pickByState(coolDarkText, warmDarkText)
commName.font = Font.heavySystemFont(12)

daoNameW.addSpacer(null)

if (activeProps > 0) {
    const activePropsTitle = daoNameW.addText(`Active `)
    activePropsTitle.textColor = pickByState(coolLightText, warmLightText)
    activePropsTitle.font = Font.systemFont(12)

    const activePropsNumber = daoNameW.addText(`${activeProps}`)
    activePropsNumber.textColor = pickByState(coolDarkText, warmDarkText)
    activePropsNumber.font = Font.systemFont(12)

    daoNameW.addSpacer(4)
}

if (pendingProps > 0) {
    const pendingPropsTitle = daoNameW.addText(`Pending `)
    pendingPropsTitle.textColor = pickByState(coolLightText, warmLightText)
    pendingPropsTitle.font = Font.systemFont(12)

    const pendingPropsNumber = daoNameW.addText(`${pendingProps}`)
    pendingPropsNumber.textColor = pickByState(coolDarkText, warmDarkText)
    pendingPropsNumber.font = Font.systemFont(12)
}

w.addSpacer(4)
w.addImage(createLine(850, 2, pickByState(coolBorder, warmBorder)))

// ----- PROPOSALS SECTION -----

let firstDone = false
let totalDisplayed = 0

for (const proposal of data.proposals) {
    if (totalDisplayed > 2) continue
    w.addSpacer(4)
    displayProposal(proposal)
    totalDisplayed++
}

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
    } else if (proposal.state === "PENDING") {
        barTextColor = pickByState(coolLightText, warmLightText)
        barBorderColor = pickByState(coolBorder, warmBorder)
        barText = 'Pending'
        time = new Date(proposal.endTime)
        deadlinePrefix = "Starts "
    } else {
        return
    }

    const timeLeft = proposal.endTime - new Date().valueOf()

    if (timeLeft <= 43200000) {
        barTextColor = red
        barBorderColor = redSemiTransparent
    }

    const deadline = getTime(time)
    // const title = proposal.title
    // const id = 

    const titleText = w.addText(`${proposal.id} · ${proposal.title}`)
    titleText.textColor = pickByState(coolDarkText, warmDarkText)
    titleText.font = Font.semiboldSystemFont(12)
    titleText.lineLimit = 1

    //  ----

    w.addSpacer(2)

    const dataW = w.addStack()
    dataW.centerAlignContent()

    const barW = dataW.addStack()
    barW.cornerRadius = 3
    barW.borderWidth = 2
    barW.borderColor = barBorderColor
    barW.setPadding(2, 3, 2, 3)

    const barTxt = barW.addText(deadlinePrefix + deadline)
    barTxt.textColor = barTextColor
    barTxt.font = Font.boldSystemFont(8)

    // titleW.addSpacer(4)

    // const titleText = titleW.addText(title)
    // titleText.textColor = pickByState(coolDarkText, warmDarkText)
    // titleText.font = Font.semiboldSystemFont(12)
    // titleText.lineLimit = 1
}

async function loadImage(imageUrl) {
    const req = new Request(imageUrl)
    const image = await req.loadImage()
    return image
}

async function loadData() {
    const url = 'https://api.nounswidgets.wtf/nouns'
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

function getIdBar(id, color, accent) {
    const context = new DrawContext()
    context.size = new Size(idBarWidth, idBarHeight)
    context.opaque = false
    context.respectScreenScale = true

    context.setFillColor(accent)
    const path = new Path()
    path.addRoundedRect(new Rect(2, 0, idBarWidth - 2, idBarHeight), 5, 4)
    context.addPath(path)
    context.fillPath()

    context.setTextAlignedCenter()
    context.setFont(Font.boldSystemFont(10))
    context.setTextColor(color)

    context.drawTextInRect(id, new Rect(2, 1, idBarWidth - 2, idBarHeight))

    return context.getImage()
}

function secondsToDhms(seconds) {
    seconds = Number(seconds)

    var h = Math.floor((seconds % (3600 * 24)) / 3600)
    var m = Math.floor((seconds % 3600) / 60)
    var s = Math.floor(seconds % 60)

    var hDisplay = h > 0 ? h + 'h ' : ''
    var mDisplay = m > 0 ? m + 'm ' : ''
    var sDisplay = s > 0 ? s + 's' : ''

    return hDisplay + mDisplay + sDisplay
}

function numOfPropsByState(proposals, state) {
    let n = 0

    proposals.forEach(e => {
        if (e.state === state) {
            n++
        }
    });

    return n
}
