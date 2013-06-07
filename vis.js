// Generated by CoffeeScript 1.6.1
(function(){var e,t,n,r,i,s,o,u,a,f,l,c={}.hasOwnProperty,h=function(e,t){function r(){this.constructor=e}for(var n in t)c.call(t,n)&&(e[n]=t[n]);r.prototype=t.prototype;e.prototype=new r;e.__super__=t.prototype;return e};o=function(e,t){var n,r,i,s,o,u,a;a="";n="";r="";if(e<0){n=" הכנסה של";r="";e=-e}if(e>=1e12){a=" trillion";e/=1e12;t=2}else if(e>=1e9){a=" מיליארד";e/=1e9;t=1}else if(e>=1e6){a=" מיליון";e/=1e6;t=1}s="";if(t>0){e<1&&(s="0");u=String(Math.round(e*Math.pow(10,t)));if(u<10){o="0"+u.substr(u.length-t,t);i=""}else{o=u.substr(u.length-t,t);i=u.substr(0,u.length-t)}return n+s+i.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,")+"."+o+a+r}u=String(Math.round(e));u=u.replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,");return n+u+a+r};t=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}h(t,e);t.prototype.defaults={data:[],field:""};t.prototype.initialize=function(){return this.on("change:field",function(){var e,t;t=this.get("field");e=budget_array_data[t];if(e){console.log("setting field "+t);this.set("data",budget_array_data[t].d);return this.set("title",budget_array_data[t].t)}return console.log("field "+t+" is "+e)})};return t}(Backbone.Model);e=function(e){function t(){return t.__super__.constructor.apply(this,arguments)}h(t,e);t.prototype.getFillColor=function(e){var t;t=d3.scale.ordinal().domain([-3,-2,-1,0,1,2,3]).range(["#ddad13","#eeca7c","#e4d0ae","#AAA","#bfc3dc","#9ea5c8","#7b82c2"]);return e.isNegative?"#fff":t(e.changeCategory)};t.prototype.getStrokeColor=function(e){var t;if(e.name===this.selectedItem)return"#FF0";t=d3.scale.ordinal().domain([-3,-2,-1,0,1,2,3]).range(["#c09100","#e7bd53","#d9c292","#999","#a7aed3","#7f8ab8","#4f5fb0"]);return t(e.changeCategory)};t.prototype.strokeWidth=function(e){console.log(e.name+" <> "+this.selectedItem);return e.name===this.selectedItem?5:1};t.prototype.pctFormat=function(e){var t;t=d3.format(".1%");return e===Infinity||e===-Infinity?"N.A":t(e)};t.prototype.defaultCharge=function(e){return e.value<0?0:-Math.pow(e.radius,2)/8};t.prototype.totalSort=function(e){var t=this;return function(n){var r,i;i=0;r=0;n.isNegative&&(n.changeCategory>0?n.x=-200:n.x=1100);n.y=n.y+(i-n.y)*(t.defaultGravity+.02)*e;return n.x=n.x+(r-n.x)*(t.defaultGravity+.02)*e}};t.prototype.buoyancy=function(e){var t=this;return function(n){var r;r=-(n.changeCategory/3)*t.boundingRadius;return n.y=n.y+(r-n.y)*t.defaultGravity*e*e*e*500}};t.prototype.categorizeChange=function(e){return isNaN(e)?0:e<-0.25?-3:e<-0.05?-2:e<-0.001?-1:e<=.001?0:e<=.05?1:e<=.25?2:3};t.prototype.setOverlayed=function(e){e=e?!0:!1;return e?this.transitiontime=0:this.transitiontime=1e3};t.prototype.initialize=function(e){var t=this;this.options=e;_.bindAll(this);this.width=970;this.height=550;this.id=this.options.id;this.overlayShown=!1;console.log("BubbleChart:initialize",this.id);this.defaultGravity=.1;this.force=this.svg=this.circle=null;this.changeTickValues=[-0.25,-0.15,-0.05,.05,.15,.25];this.centerX=this.width/2;this.centerY=this.height/2;this.model.bind("change:data",function(){return t.updateData(t.model.get("data"))});d3.select(this.el).html("");this.svg=d3.select(this.el).append("svg:svg");this.svg.on("click",function(){return l()});return console.log("init done",this.id)};t.prototype.updateData=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E;s=[];this.selectedItem=null;c=0;for(p=0,g=e.length;p<g;p++){h=e[p];c+=h.b1}this.totalValue=c!=null?c:4e8;console.log("Totalvalue: "+this.totalValue);if(typeof this!="undefined"&&this!==null?this.nodes:void 0){E=this.nodes;for(d=0,y=E.length;d<y;d++){i=E[d];s.push(i)}}this.nodes=[];this.titles=[];a=d3.scale.pow().exponent(.5).domain([0,this.totalValue]).range([1,200]);f=function(e){return a(Math.abs(e))};this.boundingRadius=f(this.totalValue);n="b1";u="b0";for(v=0,b=e.length;v<b;v++){r=e[v];o=null;l=r.id;for(m=0,w=s.length;m<w;m++){i=s[m];i.sid===l&&(o=i)}o===null&&(o={x:-150+Math.random()*300,y:-150+Math.random()*300});o.sid=r.id;o.code=strings[r.id];o.radius=f(r[n]);o.group=strings[r.p];o.groupvalue=r.pv;o.change=r.c/100;o.changeCategory=this.categorizeChange(r.c/100);o.value=r[n];o.name=strings[r.n];o.isNegative=r[n]<0;o.positions=r.positions;o.drilldown=r.d;this.titles.push(o.name);if(r[n]>0&&r[u]<0){o.changestr="הפך מהכנסה להוצאה";o.changeCategory=3}if(r[n]<0&&r[u]>0){o.changestr="הפך מהוצאה להכנסה";o.changeCategory=3}if(r.c===99999){o.changestr="תוקצב מחדש";o.changeCategory=3}this.nodes.push(o)}this.titles.sort();if(e.length>0)return this.render();t=$("div[data-id='"+this.id+"']");if(this.transitiontime>0){this.circle.transition().duration(this.transitiontime).attr("r",function(e){return 0});return t.find(".overlay").css("opacity",.9).animate({opacity:0},this.transitiontime,function(){return t.remove()})}return t.remove()};t.prototype.showOverlay=function(e){var t,n,r,i,s,o,u,a;if(this.overlayShown)return;this.overlayShown=!0;t=null;a=this.nodes;for(s=0,o=a.length;s<o;s++){u=a[s];u.drilldown===e&&(t=u)}if(t===null)return;r=this.height/t.radius/3;console.log("showOverlay: ",t.radius,this.height,r);n="translate("+this.centerX+","+this.centerY+")rotate(0)translate(1,1)scale(1)";i="translate("+this.centerX+","+this.centerY+")rotate(120)translate("+ -t.x*r+","+ -t.y*r+")scale("+r+")";if(this.transitiontime===0)this.svg.selectAll("circle").attr("transform",i);else{this.svg.selectAll("circle").transition().duration(this.transitiontime).attrTween("transform",function(){return d3.interpolateString(n,i)});console.log("TRANSITION "+n+" -> "+i)}return $("#tooltip").hide()};t.prototype.overlayRemoved=function(){var e,t;this.setOverlayed(!1);this.overlayShown=!1;e=this.svg.select("circle").attr("transform");t="translate("+this.centerX+","+this.centerY+")rotate(0)translate(1,1)scale(1)";this.svg.selectAll("circle").transition().duration(this.transitiontime).attrTween("transform",function(){return d3.interpolateString(e,t)});return this.circle.attr("r",function(e){return e.radius})};t.prototype.selectItem=function(e){this.selectedItem=e;this.circle.style("stroke-width",this.strokeWidth);return this.circle.style("stroke",this.getStrokeColor)};t.prototype.render=function(){var e,t,r,i,s,a,f,l=this;a=this;f=$("div[data-id='"+this.id+"'] .search");f.typeahead({source:function(){l.selectItem(null);l.selectedItem=null;l.circle.style("stroke-width",l.strokeWidth);l.circle.style("stroke",l.getStrokeColor);return l.titles},updater:function(e){l.selectItem(e);return e}});s=$("div[data-id='"+this.id+"'] .tag");i=!1;s.mouseenter(function(){a.selectItem($(this).text());return i=!1}).mouseleave(function(){if(!i)return a.selectItem(null)}).click(function(){a.selectItem($(this).text());return i=!0});e=$("div[data-id='"+this.id+"'] .overlayContainer");r=$("div[data-id='"+this.id+"'] .overlay");t=$("div[data-id='"+this.id+"'] .frame");r.css("height",t.height()+"px");$(window).resize(function(){console.log("frame resize");l.width=$(window).width()-8;l.width>900&&(l.width=900);l.centerX=l.width/2;if(!l.overlayShown&&l.circle){l.svg.attr("width",l.width);l.circle.attr("transform","translate("+l.centerX+","+l.centerY+")rotate(0)translate(1,1)scale(1)")}return r.css("height",t.height()+"px")});this.width=$(window).width()-8;this.width>900&&(this.width=900);this.centerX=this.width/2;this.transitiontime>0?r.css("opacity",0).animate({opacity:.9},this.transitiontime):r.css("opacity",.9);this.circle=this.svg.selectAll("circle").data(this.nodes,function(e){return e.sid});a=this;this.circle.enter().append("svg:circle").attr("transform","translate("+this.centerX+","+this.centerY+")rotate(0)translate(1,1)scale(1)").attr("data-title",function(e){return e.name}).style("stroke-width",this.strokeWidth).style("fill",this.getFillColor).style("stroke",this.getStrokeColor).style("cursor",function(e){return budget_array_data[e.drilldown]?"pointer":"inherit"}).on("click",function(e,t){budget_array_data[e.drilldown]&&n(e.drilldown);return d3.event.stopPropagation()}).on("mouseover",function(e,t){var n,r,i,s,f;n=d3.select(this);i=$(a.el).find("svg").position();s=Number(n.attr("cx"))+i.left+a.centerX-15;f=n.attr("cy")-e.radius-10+i.top+a.centerY;n.style("stroke","#000").style("stroke-width",3);d3.select("#tooltip").style("top",f+"px").style("left",s+"px").style("display","block").classed("plus",e.changeCategory>0).classed("minus",e.changeCategory<0);d3.select("#tooltip .name").html(e.name);d3.select("#tooltip .department").text(e.group);console.log("explanation for "+e.code+" "+u(e.code,2012));d3.select("#tooltip .explanation").text(u(e.code,2012));d3.select("#tooltip .value").html(o(e.value*1e3)+" ₪");if(e!=null?e.changestr:void 0)r=e.changestr;else{r=e.change==="N.A."?"N.A":a.pctFormat(Math.abs(e.change));r+=e.change<0?"-":"+"}return d3.select("#tooltip .change").html(r)}).on("mouseout",function(e,t){d3.select(this).style("stroke-width",a.strokeWidth).style("stroke",function(e){return a.getStrokeColor(e)});return d3.select("#tooltip").style("display","none")});if(this.transitiontime>0){console.log("chart "+this.id+" transitioning radius");this.circle.transition().duration(this.transitiontime).attr("r",function(e){return e.radius}).style("fill",function(e){return l.getFillColor(e)}).style("stroke",function(e){return l.getStrokeColor(e)});this.circle.exit().transition().duration(this.transitiontime).attr("r",function(e){return 0}).remove()}else{this.circle.attr("r",function(e){return e.radius}).style("fill",function(e){return l.getFillColor(e)}).style("stroke",function(e){return l.getStrokeColor(e)});this.circle.exit().remove()}this.force!==null&&this.force.stop();return this.force=d3.layout.force().nodes(this.nodes).size([this.width,this.height]).gravity(-0.01).charge(this.defaultCharge).friction(.9).on("tick",function(e){return l.circle.each(l.totalSort(e.alpha)).each(l.buoyancy(e.alpha)).attr("cx",function(e){return e.x}).attr("cy",function(e){return e.y})}).start()};return t}(Backbone.View);f=[];r=[];s=!0;n=function(e){f.push(e);return History.pushState(f,null,"?"+f.join("/"))};l=function(){if(f.length>1){f.pop();return History.pushState(f,null,"?"+f.join("/"))}};a=function(){var n,i,o,u,a,l,c,h,p,d,v,m,g;h=History.getState();f=h.data;console.log("state changed: ",h);for(i=d=0,m=f.length;0<=m?d<m:d>m;i=0<=m?++d:--d){c=f[i];a=f[i+1];o="id"+i;n=$("div[data-id='"+o+"'] .chart");if(n.size()===0){console.log("creating chart "+o);p=_.template($("#chart-template").html(),{id:o});$("#charts").append(p);n=$("div[data-id='"+o+"'] .chart");r[i]=new e({el:n,model:new t,id:o})}}u=f.length>r.length?f.length:r.length;console.log("max: "+u);for(i=v=g=u-1;g<=0?v<=0:v>=0;i=g<=0?++v:--v){console.log("setting field for "+i);if(i>=f.length){console.log("removing chart #"+i);r[i].updateData([]);r.pop();continue}c=f[i];l=!1;if(i<f.length-2||s&&i<f.length-1)l=!0;r[i].setOverlayed(l);r[i].model.set("field",c);i<f.length-1&&r[i].showOverlay(f[i+1])}if(u>f.length&&r.length>0){console.log("chart "+(r.length-1)+": overlay removed");r[r.length-1].overlayRemoved()}return s=!1};i={};u=function(e,t){var n,r;r=i[e];console.log("got years ",r);if(r){t=parseInt(t);n=r[t];n||(n=r[Object.keys(r)[0]]);console.log(i);return n}return null};window.handleExplanations=function(e){var t,n,r,s,o,u,a,f,l,c,h,p,d,v;o=1;t=null;s=null;f=null;d=e.feed.entry;for(l=0,h=d.length;l<h;l++){r=d[l];u=r.title.$t;u.search(/B[0-9]+/)===0&&(t=r.content.$t);u.search(/D[0-9]+/)===0&&(s=r.content.$t);if(u.search(/F[0-9]+/)===0){f=r.content.$t;f=f.split(",");if(t!==null&&s!==null)for(c=0,p=f.length;c<p;c++){v=f[c];a=parseInt(v);n=i[t];n||(i[t]={});i[t][a]=s}t=s=null}}return console.log(i)};document.createElementNS!=null&&document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect!=null?$(function(){var e,t,n,r;History.Adapter.bind(window,"statechange",a);e=window.location.search.slice(1);e.length===0&&(e="plpsq1");f=e.split("/");console.log("Q",f);if(f.length===1)while(budget_array_data[f[0]]){n=budget_array_data[f[0]].u;if(!n)break;f.unshift(n)}t=History.getState();if(((r=t.data)!=null?r.length:void 0)&&t.data.length>0)a();else{console.log("xxx",t.data.length);History.replaceState(f,null,"?"+f.join("/"));console.log("pushed "+f)}$(document).keyup(function(e){if(e.keyCode===27)return l()});return $("body").append('<script type="text/javascript" src="http://spreadsheets.google.com/feeds/cells/0AqR1sqwm6uPwdDJ3MGlfU0tDYzR5a1h0MXBObWhmdnc/od6/public/basic?alt=json-in-script&callback=window.handleExplanations"></script>')}):$("#charts").hide()}).call(this);