/**
 * File Created by choizhang at 2020/4/7.
 * Copyright 2016 CMCC Corporation Limited.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of
 * ZYHY Company. ("Confidential Information").  You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license.
 *
 *
 * @Desc
 * @author choizhang
 * @date 2020/4/7
 * @version
 */
const Service = require('egg').Service;

const mammoth = require('mammoth')
const fs = require('fs')
const path = require('path');
// const _ = require('underscore')
const cheerio = require('cheerio')

// const filesPath = 'egg/app/public/uploads/6012908b313b46f4bcb6f32bea82c583.docx'


function transformElement (element) {
  // console.log('element', element)
  if (element.children) {
    // var children = _.map(element.children, transformElement)
    var children = element.children.map((value)=>{
      return transformElement(value)
    })
    element = { ...element, children: children }
  }
  if (element.type === 'paragraph') {
    element = transformParagraph(element)
  }
  return element
}

function transformParagraph (element) {
  if (element.alignment === 'center' && !element.styleId) {
    return { ...element, styleName: 'center' }
  } else {
    return element
  }
}

var options = {
  styleMap: ['u => u', 'p[style-name=\'center\'] => p.center'],
  transformDocument: transformElement,
}

class MammothService extends Service {
  main(filesPath, lang) {

    mammoth
      .convertToHtml({ path: filesPath }, options)
      // .convertToHtml({ buffer: stream }, options)
      .then(function (result) {
        var html = result.value // The generated HTML
        var messages = result.messages // Any messages, such as warnings during conversion
        // console.log(html)
        let result1 = []
        let outResult = []
        let outObj = {}
        let obj = {}
        const $ = cheerio.load(html, {decodeEntities: false})

        $('u').each(function (i, title) {
          outObj.title = $(this).html()
          const $next = $(this).parent().parent().next()
          outObj.wantKonw = $next.html() === '首页展示'
          const $table = outObj.wantKonw ? $next.next() : $next
          $table.find('td').not('table table td').each(function (i, elem) {
            switch (i%3){
              case 1:
                obj.title = $(this).text()
                break;
              case 2:
                obj.ul = $(this).html()
                result1.push(obj)
                obj = {}
                break;
            }
          })
          outObj.content = result1.slice()
          outResult.push(outObj)
          outObj = {}
          result1 = []
        })
        // console.log('result1', result1)
        fs.writeFile(`app/public/oo-${lang}.js`, JSON.stringify(outResult, null, 4), res => {
          console.log(`文件写入成功${lang}`)
        })
      })
      .done()
  }
}
module.exports = MammothService;