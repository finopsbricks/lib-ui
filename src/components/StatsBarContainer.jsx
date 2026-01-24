// @ts-check
// this container implements overflow correctly.
import { Separator } from '../primitives/separator';
import { cn } from '../lib/utils';

/**
 * @param {Object} props
 * @param {Array<{type: string, label?: string, value?: any, color?: string}>} [props.items] - Array of metric or divider items
 * @param {React.ReactNode} [props.children] - Optional children to render after items
 * @returns {React.JSX.Element}
 */
export default function StatsBarContainer({items=[],children}){

  function nF(num){
    const number = new Intl.NumberFormat('en-IN');
    if(parseFloat(num)){
      if(typeof num =='number')
        num = num?.toFixed(0)
      return number.format(num);
    }else{
      return num;
    }
  }

  const Metric = function({label,value,color}){
    if(!color){
      color = value>0?'success':'warning';
      if(value==0)
        color='neutral'
    }

    const colorClasses = {
      success: 'text-foreground',
      warning: 'text-amber-600',
      neutral: 'text-muted-foreground',
      danger: 'text-destructive',
    };

    return <div className="shrink-0">
      <div className="text-xs text-muted-foreground truncate max-w-[100px]">{label}</div>
      <div className={cn("text-sm font-medium whitespace-nowrap", colorClasses[color])}>
        {nF(value)}
      </div>
    </div>
  }
  return (
    <div className="bg-muted/30 rounded-md px-3 py-2 border">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {items.map((item,i)=>{
          if(item.type=='metric')
            return <Metric key={i} label={item.label} value={item.value} color={item.color}/>
          if(item.type=='divider')
            return <div key={i} className="flex items-center h-6"><Separator orientation="vertical" /></div>
        })}
        {children}
      </div>
    </div>
  );
}
