// SPDX-License-Identifier: Apache-2
import { useEffect, useRef } from 'react';
export default function useIsMountedRef() {
    const isMounted = useRef(false);
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    return isMounted;
}
//# sourceMappingURL=useIsMountedRef.js.map