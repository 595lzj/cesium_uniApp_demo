define(["./when-208fe5b0","./Cartesian2-b4b7b0b3","./ArcType-dc1c5aee","./GeometryOffsetAttribute-3497d4dd","./Transforms-73e77b72","./Check-5e798bbf","./ComponentDatatype-2da3a966","./EllipsoidTangentPlane-69cc10ff","./GeometryAttribute-b541caa6","./GeometryAttributes-b0b294d8","./GeometryInstance-411ead1b","./GeometryPipeline-86615bad","./IndexDatatype-3bc916b1","./Math-8386669c","./PolygonGeometryLibrary-9fe00cbc","./PolygonPipeline-b445e3f3","./RuntimeError-7f634f5d","./WebGLConstants-5e2a49ab","./AxisAlignedBoundingBox-122de82b","./IntersectionTests-40db2afa","./Plane-b91bfb59","./AttributeCompression-9711314b","./EncodedCartesian3-21af0f3b","./arrayRemoveDuplicates-3a9a9480","./EllipsoidRhumbLine-73a4e3eb"],function(h,d,E,m,P,e,A,_,v,G,L,T,H,C,O,x,t,i,r,o,n,a,l,s,y){"use strict";var D=[],I=[];function g(e){var t,i=e.polygonHierarchy,r=h.defaultValue(e.ellipsoid,d.Ellipsoid.WGS84),o=h.defaultValue(e.granularity,C.CesiumMath.RADIANS_PER_DEGREE),n=h.defaultValue(e.perPositionHeight,!1),a=n&&h.defined(e.extrudedHeight),l=h.defaultValue(e.arcType,E.ArcType.GEODESIC),s=h.defaultValue(e.height,0),y=h.defaultValue(e.extrudedHeight,s);a||(t=Math.max(s,y),y=Math.min(s,y),s=t),this._ellipsoid=d.Ellipsoid.clone(r),this._granularity=o,this._height=s,this._extrudedHeight=y,this._arcType=l,this._polygonHierarchy=i,this._perPositionHeight=n,this._perPositionHeightExtrude=a,this._offsetAttribute=e.offsetAttribute,this._workerName="createPolygonOutlineGeometry",this.packedLength=O.PolygonGeometryLibrary.computeHierarchyPackedLength(i)+d.Ellipsoid.packedLength+8}g.pack=function(e,t,i){return i=h.defaultValue(i,0),i=O.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,i),d.Ellipsoid.pack(e._ellipsoid,t,i),i+=d.Ellipsoid.packedLength,t[i++]=e._height,t[i++]=e._extrudedHeight,t[i++]=e._granularity,t[i++]=e._perPositionHeightExtrude?1:0,t[i++]=e._perPositionHeight?1:0,t[i++]=e._arcType,t[i++]=h.defaultValue(e._offsetAttribute,-1),t[i]=e.packedLength,t};var c=d.Ellipsoid.clone(d.Ellipsoid.UNIT_SPHERE),f={polygonHierarchy:{}};return g.unpack=function(e,t,i){t=h.defaultValue(t,0);var r=O.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=r.startingIndex,delete r.startingIndex;var o=d.Ellipsoid.unpack(e,t,c);t+=d.Ellipsoid.packedLength;var n=e[t++],a=e[t++],l=e[t++],s=1===e[t++],y=1===e[t++],u=e[t++],p=e[t++],t=e[t];return(i=!h.defined(i)?new g(f):i)._polygonHierarchy=r,i._ellipsoid=d.Ellipsoid.clone(o,i._ellipsoid),i._height=n,i._extrudedHeight=a,i._granularity=l,i._perPositionHeight=y,i._perPositionHeightExtrude=s,i._arcType=u,i._offsetAttribute=-1===p?void 0:p,i.packedLength=t,i},g.fromPositions=function(e){return new g({polygonHierarchy:{positions:(e=h.defaultValue(e,h.defaultValue.EMPTY_OBJECT)).positions},height:e.height,extrudedHeight:e.extrudedHeight,ellipsoid:e.ellipsoid,granularity:e.granularity,perPositionHeight:e.perPositionHeight,arcType:e.arcType,offsetAttribute:e.offsetAttribute})},g.createGeometry=function(e){var t=e._ellipsoid,i=e._granularity,r=e._polygonHierarchy,o=e._perPositionHeight,n=e._arcType,a=O.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(r,!o,t);if(0!==a.length){var l,s,y,u,p,d,g=[],c=C.CesiumMath.chordLength(i,t.maximumRadius),f=e._height,b=e._extrudedHeight;if(e._perPositionHeightExtrude||!C.CesiumMath.equalsEpsilon(f,b,0,C.CesiumMath.EPSILON2))for(l=0;l<a.length;l++)(u=function(e,t,i,r,o){var n,a=_.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,D);x.PolygonPipeline.computeWindingOrder2D(a)===x.WindingOrder.CLOCKWISE&&(a.reverse(),t=t.slice().reverse());var l=t.length,s=new Array(l),y=0;if(r)for(n=new Float64Array(2*l*3*2),m=0;m<l;++m){s[m]=y/3;var u=t[m],p=t[(m+1)%l];n[y++]=u.x,n[y++]=u.y,n[y++]=u.z,n[y++]=p.x,n[y++]=p.y,n[y++]=p.z}else{var d,g=0;if(o===E.ArcType.GEODESIC)for(m=0;m<l;m++)g+=O.PolygonGeometryLibrary.subdivideLineCount(t[m],t[(m+1)%l],i);else if(o===E.ArcType.RHUMB)for(m=0;m<l;m++)g+=O.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[m],t[(m+1)%l],i);for(n=new Float64Array(3*g*2),m=0;m<l;++m){s[m]=y/3,o===E.ArcType.GEODESIC?d=O.PolygonGeometryLibrary.subdivideLine(t[m],t[(m+1)%l],i,I):o===E.ArcType.RHUMB&&(d=O.PolygonGeometryLibrary.subdivideRhumbLine(e,t[m],t[(m+1)%l],i,I));for(var c=d.length,f=0;f<c;++f)n[y++]=d[f]}}for(var l=n.length/6,b=s.length,h=H.IndexDatatype.createTypedArray(l+b,2*(2*l+b)),y=0,m=0;m<l;++m)h[y++]=m,h[y++]=(m+1)%l,h[y++]=m+l,h[y++]=(m+1)%l+l;for(m=0;m<b;m++){var P=s[m];h[y++]=P,h[y++]=P+l}return new L.GeometryInstance({geometry:new v.Geometry({attributes:new G.GeometryAttributes({position:new v.GeometryAttribute({componentDatatype:A.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})}),indices:h,primitiveType:v.PrimitiveType.LINES})})}(t,a[l],c,o,n)).geometry=O.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(u.geometry,f,b,t,o),h.defined(e._offsetAttribute)&&(s=u.geometry.attributes.position.values.length/3,y=new Uint8Array(s),y=e._offsetAttribute===m.GeometryOffsetAttribute.TOP?m.arrayFill(y,1,0,s/2):(d=e._offsetAttribute===m.GeometryOffsetAttribute.NONE?0:1,m.arrayFill(y,d)),u.geometry.attributes.applyOffset=new v.GeometryAttribute({componentDatatype:A.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:y})),g.push(u);else for(l=0;l<a.length;l++)(u=function(e,t,i,r,o){var n,a=_.EllipsoidTangentPlane.fromPoints(t,e).projectPointsOntoPlane(t,D);x.PolygonPipeline.computeWindingOrder2D(a)===x.WindingOrder.CLOCKWISE&&(a.reverse(),t=t.slice().reverse());var l=t.length,s=0;if(r)for(n=new Float64Array(2*l*3),b=0;b<l;b++){var y=t[b],u=t[(b+1)%l];n[s++]=y.x,n[s++]=y.y,n[s++]=y.z,n[s++]=u.x,n[s++]=u.y,n[s++]=u.z}else{var p,d=0;if(o===E.ArcType.GEODESIC)for(b=0;b<l;b++)d+=O.PolygonGeometryLibrary.subdivideLineCount(t[b],t[(b+1)%l],i);else if(o===E.ArcType.RHUMB)for(b=0;b<l;b++)d+=O.PolygonGeometryLibrary.subdivideRhumbLineCount(e,t[b],t[(b+1)%l],i);for(n=new Float64Array(3*d),b=0;b<l;b++){o===E.ArcType.GEODESIC?p=O.PolygonGeometryLibrary.subdivideLine(t[b],t[(b+1)%l],i,I):o===E.ArcType.RHUMB&&(p=O.PolygonGeometryLibrary.subdivideRhumbLine(e,t[b],t[(b+1)%l],i,I));for(var g=p.length,c=0;c<g;++c)n[s++]=p[c]}}for(var l=n.length/3,f=H.IndexDatatype.createTypedArray(l,2*l),s=0,b=0;b<l-1;b++)f[s++]=b,f[s++]=b+1;return f[s++]=l-1,f[s++]=0,new L.GeometryInstance({geometry:new v.Geometry({attributes:new G.GeometryAttributes({position:new v.GeometryAttribute({componentDatatype:A.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})}),indices:f,primitiveType:v.PrimitiveType.LINES})})}(t,a[l],c,o,n)).geometry.attributes.position.values=x.PolygonPipeline.scaleToGeodeticHeight(u.geometry.attributes.position.values,f,t,!o),h.defined(e._offsetAttribute)&&(p=u.geometry.attributes.position.values.length,p=new Uint8Array(p/3),d=e._offsetAttribute===m.GeometryOffsetAttribute.NONE?0:1,m.arrayFill(p,d),u.geometry.attributes.applyOffset=new v.GeometryAttribute({componentDatatype:A.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:p})),g.push(u);r=T.GeometryPipeline.combineInstances(g)[0],i=P.BoundingSphere.fromVertices(r.attributes.position.values);return new v.Geometry({attributes:r.attributes,indices:r.indices,primitiveType:r.primitiveType,boundingSphere:i,offsetAttribute:e._offsetAttribute})}},function(e,t){return(e=h.defined(t)?g.unpack(e,t):e)._ellipsoid=d.Ellipsoid.clone(e._ellipsoid),g.createGeometry(e)}});